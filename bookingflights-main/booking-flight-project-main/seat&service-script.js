// ============================================
// LOAD BOOKING DATA FROM PREVIOUS PAGE
// ============================================

// Get flight data from localStorage (set by search page)
const passengerCounts = JSON.parse(localStorage.getItem('passengerCounts')) || { adult: 1, child: 0, infant: 0 };
const outboundFlightData = JSON.parse(localStorage.getItem('outboundFlight'));
const returnFlightData = JSON.parse(localStorage.getItem('returnFlight'));
const isRoundTrip = localStorage.getItem('isRoundTrip') === 'true';

// Get current user ID
const currentUserId = localStorage.getItem('userId') || 1;

// Calculate total passengers
const totalPassengers = parseInt(localStorage.getItem('totalPassengers')) || 1;

// Current state tracking
let currentPassengerIndex = 0;
let currentFlightType = 'departure';

// ============================================
// DATA STORAGE FOR ALL PASSENGERS & FLIGHTS
// ============================================

const passengersData = [];

// Initialize passengers data
for (let i = 0; i < totalPassengers; i++) {
    const defaultLuggage = { weight: '20', price: 0 };
    const defaultMeal = { selected: false, type: '', price: 0 };
    const defaultWifi = { selected: false, price: 0 };
    
    passengersData.push({
        title: '',
        firstName: '',
        lastName: '',
        passportNumber: '',
        
        departure: {
            seat: null,
            luggage: { ...defaultLuggage },
            meal: { ...defaultMeal },
            wifi: { ...defaultWifi }
        },
        
        return: {
            seat: null,
            luggage: { ...defaultLuggage },
            meal: { ...defaultMeal },
            wifi: { ...defaultWifi }
        }
    });
}

// ============================================
// API HELPER FUNCTION
// ============================================
async function sendData(action, data) {
    try {
        console.log(`📡 Sending ${action}:`, data);
        
        const response = await fetch(`api.php?action=${action}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const responseText = await response.text();
        console.log('📡 Raw response:', responseText);
        
        const result = JSON.parse(responseText);
        console.log('📡 Parsed response:', result);
        
        if (!result.success) {
            throw new Error(result.message || 'API request failed');
        }
        
        return result;
    } catch (error) {
        console.error(`❌ Error in sendData(${action}):`, error);
        throw error;
    }
}

// ============================================
// INITIALIZATION
// ============================================

function init() {
    // Show flight tabs only if round trip
    if (isRoundTrip) {
        document.getElementById('flight-tabs').style.display = 'flex';
    }
    
    generatePassengerTabs();
    generatePassengerForms();
    generateSeatMap();
    showPassenger(0);
    setupLuggageListeners();
    setupServiceListeners();
    updateFlightInfoBanner();
}

// ============================================
// FLIGHT SWITCHING (for Round Trip)
// ============================================

function switchFlight(flightType) {
    saveCurrentPassengerData();
    currentFlightType = flightType;
    
    document.querySelectorAll('.flight-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.getElementById(`${flightType}-tab`).classList.add('active');
    
    updateFlightInfoBanner();
    loadPassengerData(currentPassengerIndex);
    generateSeatMap();
}

function updateFlightInfoBanner() {
    const banner = document.getElementById('current-flight-info');
    
    if (currentFlightType === 'departure' && outboundFlightData) {
        banner.innerHTML = `Departure Flight: ${outboundFlightData.flightId} on ${formatDate(outboundFlightData.date)}`;
        banner.style.display = 'block';
    } else if (currentFlightType === 'return' && returnFlightData) {
        banner.innerHTML = `Return Flight: ${returnFlightData.flightId} on ${formatDate(returnFlightData.date)}`;
        banner.style.display = 'block';
    } else {
        banner.style.display = 'none';
    }
}

// ============================================
// PASSENGER TABS GENERATION
// ============================================

function generatePassengerTabs() {
    const tabsContainer = document.getElementById('passenger-tabs');
    tabsContainer.innerHTML = '';
    
    for (let i = 0; i < totalPassengers; i++) {
        const tab = document.createElement('div');
        tab.className = 'passenger-tab';
        if (i === 0) tab.classList.add('active');
        tab.textContent = `Passenger ${i + 1}`;
        tab.onclick = () => switchToPassenger(i);
        tabsContainer.appendChild(tab);
    }
}

// ============================================
// PASSENGER FORMS GENERATION
// ============================================

function generatePassengerForms() {
    const formsContainer = document.getElementById('passenger-forms');
    formsContainer.innerHTML = '';
    
    for (let i = 0; i < totalPassengers; i++) {
        const form = document.createElement('div');
        form.className = 'passenger-form';
        if (i === 0) form.classList.add('active');
        form.id = `passenger-form-${i}`;
        
        form.innerHTML = `
            <h2>Passenger ${i + 1} Information</h2>
            <div class="form-grid">
                <div class="form-group">
                    <label>Title *</label>
                    <select id="title-${i}" required>
                        <option value="">Select title</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Mrs.">Mrs.</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>First Name *</label>
                    <input type="text" id="firstname-${i}" placeholder="Enter first name" required>
                </div>
                <div class="form-group">
                    <label>Last Name *</label>
                    <input type="text" id="lastname-${i}" placeholder="Enter last name" required>
                </div>
                <div class="form-group">
                    <label>Passport Number *</label>
                    <input type="text" id="passport-${i}" placeholder="Enter passport number" required>
                </div>
            </div>
        `;
        
        formsContainer.appendChild(form);
    }
}

// ============================================
// SEAT MAP GENERATION - WITH REAL-TIME OCCUPIED SEATS
// ============================================

let realOccupiedSeats = []; // Seats that are already paid for in the database

async function generateSeatMap() {
    const seatMap = document.getElementById('seat-map');
    seatMap.innerHTML = '<div style="text-align:center; padding:20px;">Loading seats...</div>';
    
    // Get the current flight ID
    const currentFlight = currentFlightType === 'departure' ? outboundFlightData : returnFlightData;
    
    if (!currentFlight) {
        seatMap.innerHTML = '<div style="text-align:center; padding:20px;">No flight selected</div>';
        return;
    }
    
    try {
        // Fetch occupied seats from database
        const response = await fetch(`api.php?action=getOccupiedSeats&flight_id=${currentFlight.flightId}`);
        const result = await response.json();
        
        if (result.success) {
            realOccupiedSeats = result.occupiedSeats || [];
            console.log('✅ Loaded occupied seats:', realOccupiedSeats);
        } else {
            console.error('Failed to load occupied seats:', result.message);
            realOccupiedSeats = [];
        }
    } catch (error) {
        console.error('Error loading occupied seats:', error);
        realOccupiedSeats = [];
    }
    
    // Clear loading message
    seatMap.innerHTML = '';
    
    const rows = 32;
    const columns = ['A', 'B', 'C', '', 'D', 'E', 'F'];
    
    for (let row = 1; row <= rows; row++) {
        const rowNum = document.createElement('div');
        rowNum.className = 'row-number';
        rowNum.textContent = row;
        seatMap.appendChild(rowNum);
        
        columns.forEach(col => {
            if (col === '') {
                const aisle = document.createElement('div');
                aisle.className = 'aisle';
                seatMap.appendChild(aisle);
            } else {
                const seatId = `${row}${col}`;
                const seat = document.createElement('div');
                seat.className = 'seat';
                seat.textContent = seatId;
                seat.dataset.seat = seatId;
                
                // Check if seat is occupied in database
                if (realOccupiedSeats.includes(seatId)) {
                    seat.classList.add('occupied');
                    seat.title = 'This seat is already booked';
                } else {
                    seat.onclick = () => selectSeat(seatId);
                }
                
                seatMap.appendChild(seat);
            }
        });
    }
    
    updateSeatDisplay();
}

// ============================================
// SEAT SELECTION
// ============================================

function selectSeat(seatId) {
    const passenger = passengersData[currentPassengerIndex];
    const flightData = passenger[currentFlightType];
    
    const seatElement = document.querySelector(`.seat[data-seat="${seatId}"]`);
    if (seatElement.classList.contains('occupied')) {
        alert('This seat is already occupied!');
        return;
    }
    
    const takenBySomeone = passengersData.some((p, idx) => 
        idx !== currentPassengerIndex && p[currentFlightType].seat === seatId
    );
    
    if (takenBySomeone) {
        alert('This seat is already selected by another passenger in your booking!');
        return;
    }
    
    flightData.seat = seatId;
    updateSeatDisplay();
    updateSelectedSeatsInfo();
}

function updateSeatDisplay() {
    const allSeats = document.querySelectorAll('.seat');
    
    allSeats.forEach(seat => {
        const seatId = seat.dataset.seat;
        
        if (seat.classList.contains('occupied')) {
            return;
        }
        
        seat.classList.remove('selected', 'taken');
        
        passengersData.forEach((p, idx) => {
            if (p[currentFlightType].seat === seatId) {
                if (idx === currentPassengerIndex) {
                    seat.classList.add('selected');
                } else {
                    seat.classList.add('taken');
                }
            }
        });
    });
}

function updateSelectedSeatsInfo() {
    const infoDiv = document.getElementById('selected-seats-info');
    
    const selectedSeats = passengersData
        .map((p, idx) => p[currentFlightType].seat ? `Passenger ${idx + 1}: ${p[currentFlightType].seat}` : null)
        .filter(s => s !== null);
    
    if (selectedSeats.length > 0) {
        infoDiv.textContent = `Selected Seats: ${selectedSeats.join(' | ')}`;
        infoDiv.style.display = 'block';
    } else {
        infoDiv.style.display = 'none';
    }
}

// ============================================
// LUGGAGE SELECTION LISTENERS
// ============================================

function setupLuggageListeners() {
    document.querySelectorAll('input[name="luggage-current"]').forEach(radio => {
        radio.addEventListener('change', function() {
            document.querySelectorAll('#luggage-options .option-card').forEach(card => {
                card.classList.remove('selected');
            });
            this.parentElement.classList.add('selected');
            
            const passenger = passengersData[currentPassengerIndex];
            passenger[currentFlightType].luggage = {
                weight: this.value,
                price: parseInt(this.dataset.price)
            };
        });
    });
}

// ============================================
// SERVICE SELECTION LISTENERS
// ============================================

function setupServiceListeners() {
    const mealCheckbox = document.getElementById('meal-service-current');
    const mealDropdown = document.getElementById('meal-dropdown');
    const mealTypeSelect = document.getElementById('meal-type-current');
    const serviceCard = mealCheckbox.closest('.service-card');
    
    mealCheckbox.addEventListener('change', function() {
        const passenger = passengersData[currentPassengerIndex];
        const flightData = passenger[currentFlightType];
        
        if (this.checked) {
            mealDropdown.classList.add('active');
            serviceCard.classList.add('active');
            flightData.meal.selected = true;
            flightData.meal.price = 100;
        } else {
            mealDropdown.classList.remove('active');
            serviceCard.classList.remove('active');
            mealTypeSelect.value = '';
            flightData.meal.selected = false;
            flightData.meal.type = '';
            flightData.meal.price = 0;
        }
    });
    
    mealTypeSelect.addEventListener('change', function() {
        const passenger = passengersData[currentPassengerIndex];
        passenger[currentFlightType].meal.type = this.value;
    });
    
    const wifiCheckbox = document.getElementById('wifi-service-current');
    const wifiServiceCard = wifiCheckbox.closest('.service-card');
    
    wifiCheckbox.addEventListener('change', function() {
        const passenger = passengersData[currentPassengerIndex];
        const flightData = passenger[currentFlightType];
        
        if (this.checked) {
            wifiServiceCard.classList.add('active');
            flightData.wifi.selected = true;
            flightData.wifi.price = 500;
        } else {
            wifiServiceCard.classList.remove('active');
            flightData.wifi.selected = false;
            flightData.wifi.price = 0;
        }
    });
}

// ============================================
// PASSENGER NAVIGATION
// ============================================

function showPassenger(index) {
    currentPassengerIndex = index;
    
    document.querySelectorAll('.passenger-form').forEach((form, i) => {
        form.classList.toggle('active', i === index);
    });
    
    document.querySelectorAll('.passenger-tab').forEach((tab, i) => {
        tab.classList.remove('active');
        if (i === index) tab.classList.add('active');
    });
    
    document.getElementById('current-passenger-seat').textContent = `Passenger ${index + 1}`;
    document.getElementById('current-passenger-luggage').textContent = `Passenger ${index + 1}`;
    document.getElementById('current-passenger-services').textContent = `Passenger ${index + 1}`;
    
    loadPassengerData(index);
    updateNavigationButtons();
    updateSeatDisplay();
    updateSelectedSeatsInfo();
}

function loadPassengerData(index) {
    const passenger = passengersData[index];
    const flightData = passenger[currentFlightType];
    
    document.getElementById(`title-${index}`).value = passenger.title;
    document.getElementById(`firstname-${index}`).value = passenger.firstName;
    document.getElementById(`lastname-${index}`).value = passenger.lastName;
    document.getElementById(`passport-${index}`).value = passenger.passportNumber;
    
    document.querySelectorAll('input[name="luggage-current"]').forEach(r => r.checked = false);
    document.querySelectorAll('#luggage-options .option-card').forEach(c => c.classList.remove('selected'));
    
    const luggageRadio = document.querySelector(`input[name="luggage-current"][value="${flightData.luggage.weight}"]`);
    if (luggageRadio) {
        luggageRadio.checked = true;
        luggageRadio.parentElement.classList.add('selected');
    }
    
    const mealCheckbox = document.getElementById('meal-service-current');
    const mealDropdown = document.getElementById('meal-dropdown');
    const mealTypeSelect = document.getElementById('meal-type-current');
    const mealServiceCard = mealCheckbox.closest('.service-card');
    
    mealCheckbox.checked = flightData.meal.selected;
    mealTypeSelect.value = flightData.meal.type;
    
    if (flightData.meal.selected) {
        mealDropdown.classList.add('active');
        mealServiceCard.classList.add('active');
    } else {
        mealDropdown.classList.remove('active');
        mealServiceCard.classList.remove('active');
    }
    
    const wifiCheckbox = document.getElementById('wifi-service-current');
    const wifiServiceCard = wifiCheckbox.closest('.service-card');
    
    wifiCheckbox.checked = flightData.wifi.selected;
    
    if (flightData.wifi.selected) {
        wifiServiceCard.classList.add('active');
    } else {
        wifiServiceCard.classList.remove('active');
    }
}

function saveCurrentPassengerData() {
    const index = currentPassengerIndex;
    const passenger = passengersData[index];
    
    passenger.title = document.getElementById(`title-${index}`).value;
    passenger.firstName = document.getElementById(`firstname-${index}`).value;
    passenger.lastName = document.getElementById(`lastname-${index}`).value;
    passenger.passportNumber = document.getElementById(`passport-${index}`).value;
}

function validateCurrentPassenger() {
    const index = currentPassengerIndex;
    const passenger = passengersData[index];
    const flightData = passenger[currentFlightType];
    
    saveCurrentPassengerData();
    
    if (!passenger.title || !passenger.firstName || !passenger.lastName || !passenger.passportNumber) {
        alert('Please fill in all passenger information fields.');
        return false;
    }
    
    if (!flightData.seat) {
        alert(`Please select a seat for this passenger on the ${currentFlightType} flight.`);
        return false;
    }
    
    if (flightData.meal.selected && !flightData.meal.type) {
        alert('Please select a meal type.');
        return false;
    }
    
    return true;
}

function switchToPassenger(index) {
    if (index === currentPassengerIndex) return;
    saveCurrentPassengerData();
    showPassenger(index);
}

function nextPassenger() {
    if (!validateCurrentPassenger()) return;
    
    const passengerTab = document.querySelectorAll('.passenger-tab')[currentPassengerIndex];
    const passenger = passengersData[currentPassengerIndex];
    const isDepartureComplete = passenger.departure.seat !== null;
    const isReturnComplete = !isRoundTrip || passenger.return.seat !== null;
    
    if (isDepartureComplete && isReturnComplete) {
        passengerTab.classList.add('completed');
    }
    
    if (currentPassengerIndex < totalPassengers - 1) {
        showPassenger(currentPassengerIndex + 1);
    }
}

function previousPassenger() {
    saveCurrentPassengerData();
    if (currentPassengerIndex > 0) {
        showPassenger(currentPassengerIndex - 1);
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const reviewBtn = document.getElementById('review-btn');
    
    if (currentPassengerIndex === 0) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'inline-block';
    }
    
    if (currentPassengerIndex === totalPassengers - 1) {
        nextBtn.style.display = 'none';
        reviewBtn.style.display = 'inline-block';
    } else {
        nextBtn.style.display = 'inline-block';
        reviewBtn.style.display = 'none';
    }
}

// ============================================
// BOOKING REVIEW & SAVE TO DATABASE
// ============================================

async function reviewBooking() {
    // Validate last passenger
    if (!validateCurrentPassenger()) return;
    
    // Check if ALL passengers have completed ALL required flights
    for (let i = 0; i < totalPassengers; i++) {
        const passenger = passengersData[i];
        
        if (!passenger.departure.seat) {
            alert(`Passenger ${i + 1} has not selected a seat for the departure flight!`);
            showPassenger(i);
            if (isRoundTrip) switchFlight('departure');
            return;
        }
        
        if (isRoundTrip && !passenger.return.seat) {
            alert(`Passenger ${i + 1} has not selected a seat for the return flight!`);
            showPassenger(i);
            switchFlight('return');
            return;
        }
    }
    
    // Show loading
    const reviewBtn = document.getElementById('review-btn');
    reviewBtn.disabled = true;
    reviewBtn.textContent = 'Saving...';
    
    try {
        // ============================================
        // SAVE BOOKINGS TO DATABASE
        // ============================================
        console.log('📝 Creating bookings in database...');
        
        const bookingIds = [];
        
        // Create departure booking
        const departureBookingData = {
            user_id: currentUserId,
            flight_id: outboundFlightData.flightId,
            seat_id: passengersData[0].departure.seat,
            status: 'Pending' // Will be updated to 'Paid' or 'Failed' after payment
        };
        
        const departureResult = await sendData('addBooking', departureBookingData);
        if (departureResult.success) {
            bookingIds.push({ type: 'departure', id: departureResult.booking_id });
            console.log('✅ Departure booking created:', departureResult.booking_id);
        }
        
        // Create return booking if round trip
        if (isRoundTrip && returnFlightData) {
            const returnBookingData = {
                user_id: currentUserId,
                flight_id: returnFlightData.flightId,
                seat_id: passengersData[0].return.seat,
                status: 'Pending'
            };
            
            const returnResult = await sendData('addBooking', returnBookingData);
            if (returnResult.success) {
                bookingIds.push({ type: 'return', id: returnResult.booking_id });
                console.log('✅ Return booking created:', returnResult.booking_id);
            }
        }
        
        // Save booking IDs to localStorage for payment page
        localStorage.setItem('currentBookingIds', JSON.stringify(bookingIds));
        
        // Save all booking data to localStorage
        localStorage.setItem('bookingData', JSON.stringify(passengersData));
        
        console.log('✅ All bookings saved to database');
        
        // Redirect to payment page
        window.location.href = 'payment.html';
        
    } catch (error) {
        console.error('❌ Failed to save bookings:', error);
        alert('Failed to save bookings: ' + error.message);
        reviewBtn.disabled = false;
        reviewBtn.textContent = 'Review Booking';
    }
}

function cancelBooking() {
    if (confirm('Are you sure you want to cancel? All information will be lost.')) {
        window.location.href = 'search.html';
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// ============================================
// START APPLICATION
// ============================================

init();
