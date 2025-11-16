// ============================================
// FLIGHT DATA REFERENCE
// ============================================
const flights = [
    { flight_id: 'TG640-1', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Kansai International Airport', arrival_airport_id: 'KIX', depart_time: '08:30', arrival_time: '13:45', country_from: 'Thailand', country_to: 'Japan', price: 12500 },
    { flight_id: 'TG640-2', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Kansai International Airport', arrival_airport_id: 'KIX', depart_time: '13:20', arrival_time: '18:30', country_from: 'Thailand', country_to: 'Japan', price: 11800 },
    { flight_id: 'TG640-3', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Kansai International Airport', arrival_airport_id: 'KIX', depart_time: '20:00', arrival_time: '01:10', country_from: 'Thailand', country_to: 'Japan', price: 10900 },
    { flight_id: 'TG642-1', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Narita International Airport', arrival_airport_id: 'NRT', depart_time: '07:10', arrival_time: '13:00', country_from: 'Thailand', country_to: 'Japan', price: 13200 },
    { flight_id: 'TG642-2', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Narita International Airport', arrival_airport_id: 'NRT', depart_time: '12:30', arrival_time: '18:15', country_from: 'Thailand', country_to: 'Japan', price: 12600 },
    { flight_id: 'TG642-3', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Narita International Airport', arrival_airport_id: 'NRT', depart_time: '22:00', arrival_time: '04:50', country_from: 'Thailand', country_to: 'Japan', price: 11400 },
    { flight_id: 'XJ600-1', depart_airport_name: 'Don Mueang International Airport', depart_airport_id: 'DMK', arrival_airport_name: 'Kansai International Airport', arrival_airport_id: 'KIX', depart_time: '06:50', arrival_time: '11:30', country_from: 'Thailand', country_to: 'Japan', price: 8900 },
    { flight_id: 'XJ600-2', depart_airport_name: 'Don Mueang International Airport', depart_airport_id: 'DMK', arrival_airport_name: 'Kansai International Airport', arrival_airport_id: 'KIX', depart_time: '14:10', arrival_time: '19:00', country_from: 'Thailand', country_to: 'Japan', price: 8500 },
    { flight_id: 'XJ600-3', depart_airport_name: 'Don Mueang International Airport', depart_airport_id: 'DMK', arrival_airport_name: 'Kansai International Airport', arrival_airport_id: 'KIX', depart_time: '21:30', arrival_time: '02:15', country_from: 'Thailand', country_to: 'Japan', price: 7800 },
    { flight_id: 'XJ610-1', depart_airport_name: 'Don Mueang International Airport', depart_airport_id: 'DMK', arrival_airport_name: 'Narita International Airport', arrival_airport_id: 'NRT', depart_time: '07:20', arrival_time: '12:10', country_from: 'Thailand', country_to: 'Japan', price: 9200 },
    { flight_id: 'XJ610-2', depart_airport_name: 'Don Mueang International Airport', depart_airport_id: 'DMK', arrival_airport_name: 'Narita International Airport', arrival_airport_id: 'NRT', depart_time: '15:00', arrival_time: '20:10', country_from: 'Thailand', country_to: 'Japan', price: 8800 },
    { flight_id: 'XJ610-3', depart_airport_name: 'Don Mueang International Airport', depart_airport_id: 'DMK', arrival_airport_name: 'Narita International Airport', arrival_airport_id: 'NRT', depart_time: '22:45', arrival_time: '04:00', country_from: 'Thailand', country_to: 'Japan', price: 8100 },
    { flight_id: 'JL728-1', depart_airport_name: 'Kansai International Airport', depart_airport_id: 'KIX', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '09:00', arrival_time: '14:20', country_from: 'Japan', country_to: 'Thailand', price: 12800 },
    { flight_id: 'JL728-2', depart_airport_name: 'Kansai International Airport', depart_airport_id: 'KIX', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '17:40', arrival_time: '22:55', country_from: 'Japan', country_to: 'Thailand', price: 12200 },
    { flight_id: 'JL728-3', depart_airport_name: 'Kansai International Airport', depart_airport_id: 'KIX', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '23:10', arrival_time: '04:30', country_from: 'Japan', country_to: 'Thailand', price: 11100 },
    { flight_id: 'JL718-1', depart_airport_name: 'Narita International Airport', depart_airport_id: 'NRT', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '10:20', arrival_time: '15:00', country_from: 'Japan', country_to: 'Thailand', price: 13500 },
    { flight_id: 'JL718-2', depart_airport_name: 'Narita International Airport', depart_airport_id: 'NRT', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '16:50', arrival_time: '21:30', country_from: 'Japan', country_to: 'Thailand', price: 12900 },
    { flight_id: 'JL718-3', depart_airport_name: 'Narita International Airport', depart_airport_id: 'NRT', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '22:30', arrival_time: '03:15', country_from: 'Japan', country_to: 'Thailand', price: 11700 },
    { flight_id: 'FD300-1', depart_airport_name: 'Don Mueang International Airport', depart_airport_id: 'DMK', arrival_airport_name: 'Fukuoka Airport', arrival_airport_id: 'FUK', depart_time: '05:45', arrival_time: '10:00', country_from: 'Thailand', country_to: 'Japan', price: 7500 },
    { flight_id: 'FD300-2', depart_airport_name: 'Don Mueang International Airport', depart_airport_id: 'DMK', arrival_airport_name: 'Fukuoka Airport', arrival_airport_id: 'FUK', depart_time: '14:20', arrival_time: '18:40', country_from: 'Thailand', country_to: 'Japan', price: 7200 },
    { flight_id: 'FD300-3', depart_airport_name: 'Don Mueang International Airport', depart_airport_id: 'DMK', arrival_airport_name: 'Fukuoka Airport', arrival_airport_id: 'FUK', depart_time: '22:10', arrival_time: '02:20', country_from: 'Thailand', country_to: 'Japan', price: 6800 },
    { flight_id: 'FD301-1', depart_airport_name: 'Fukuoka Airport', depart_airport_id: 'FUK', arrival_airport_name: 'Don Mueang International Airport', arrival_airport_id: 'DMK', depart_time: '08:00', arrival_time: '12:10', country_from: 'Japan', country_to: 'Thailand', price: 7600 },
    { flight_id: 'FD301-2', depart_airport_name: 'Fukuoka Airport', depart_airport_id: 'FUK', arrival_airport_name: 'Don Mueang International Airport', arrival_airport_id: 'DMK', depart_time: '14:45', arrival_time: '19:00', country_from: 'Japan', country_to: 'Thailand', price: 7300 },
    { flight_id: 'FD301-3', depart_airport_name: 'Fukuoka Airport', depart_airport_id: 'FUK', arrival_airport_name: 'Don Mueang International Airport', arrival_airport_id: 'DMK', depart_time: '21:30', arrival_time: '01:40', country_from: 'Japan', country_to: 'Thailand', price: 6900 },
    { flight_id: 'TG650-1', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Chubu Centrair International Airport', arrival_airport_id: 'NGO', depart_time: '10:00', arrival_time: '14:30', country_from: 'Thailand', country_to: 'Japan', price: 11900 },
    { flight_id: 'TG650-2', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Chubu Centrair International Airport', arrival_airport_id: 'NGO', depart_time: '15:30', arrival_time: '20:00', country_from: 'Thailand', country_to: 'Japan', price: 11300 },
    { flight_id: 'TG650-3', depart_airport_name: 'Suvarnabhumi International Airport', depart_airport_id: 'BKK', arrival_airport_name: 'Chubu Centrair International Airport', arrival_airport_id: 'NGO', depart_time: '23:50', arrival_time: '04:20', country_from: 'Thailand', country_to: 'Japan', price: 10500 },
    { flight_id: 'TG651-1', depart_airport_name: 'Chubu Centrair International Airport', depart_airport_id: 'NGO', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '08:30', arrival_time: '12:50', country_from: 'Japan', country_to: 'Thailand', price: 12100 },
    { flight_id: 'TG651-2', depart_airport_name: 'Chubu Centrair International Airport', depart_airport_id: 'NGO', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '15:20', arrival_time: '19:40', country_from: 'Japan', country_to: 'Thailand', price: 11500 },
    { flight_id: 'TG651-3', depart_airport_name: 'Chubu Centrair International Airport', depart_airport_id: 'NGO', arrival_airport_name: 'Suvarnabhumi International Airport', arrival_airport_id: 'BKK', depart_time: '22:00', arrival_time: '02:10', country_from: 'Japan', country_to: 'Thailand', price: 10700 }
];

// ============================================
// GLOBAL VARIABLES
// ============================================
const passengersData = [];
let outboundFlightData = null;
let returnFlightData = null;
let isRoundTrip = false;
let totalPassengers = 1;
const currentUserId = localStorage.getItem('userId') || 1;
let bookingIds = [];

let selectedPaymentMethod = null;
let totalAmount = 0;

// ============================================
// INITIALIZATION
// ============================================
window.onload = function() {
    console.log('💳 Payment page loading...');
    init();
};

function init() {
    // Load flight data
    outboundFlightData = JSON.parse(localStorage.getItem('outboundFlight'));
    returnFlightData = JSON.parse(localStorage.getItem('returnFlight'));
    isRoundTrip = localStorage.getItem('isRoundTrip') === 'true';
    totalPassengers = parseInt(localStorage.getItem('totalPassengers')) || 1;
    
    // Load booking IDs created in seat&service page
    const savedBookingIds = localStorage.getItem('currentBookingIds');
    if (savedBookingIds) {
        bookingIds = JSON.parse(savedBookingIds);
        console.log('📝 Loaded booking IDs:', bookingIds);
    }

    console.log('Flight data loaded:', {outboundFlightData, returnFlightData, isRoundTrip, totalPassengers});

    if (!outboundFlightData) {
        console.error('❌ No outbound flight data found!');
        alert('No flight data found! Please start from the beginning.');
        window.location.href = 'search.html';
        return;
    }

    const savedData = localStorage.getItem('bookingData');
    if (savedData) {
        const data = JSON.parse(savedData);
        passengersData.push(...data);
        console.log('✅ Loaded', passengersData.length, 'passengers');
    } else {
        console.error('❌ No booking data found!');
        alert('No booking data found! Please start from the beginning.');
        window.location.href = 'search.html';
        return;
    }

    generateTickets();
    updateSummary();
    console.log('✅ Payment page ready');
}

// ============================================
// GENERATE TICKETS
// ============================================
function generateTickets() {
    const container = document.getElementById('tickets-container');
    container.innerHTML = '';
    totalAmount = 0;

    passengersData.forEach((passenger, index) => {
        const departureTicket = createTicket(passenger, 'departure', index + 1);
        container.appendChild(departureTicket);

        if (isRoundTrip && returnFlightData) {
            const returnTicket = createTicket(passenger, 'return', index + 1);
            container.appendChild(returnTicket);
        }
    });

    console.log('✅ Generated tickets. Total amount:', totalAmount);
}

function createTicket(passenger, flightType, passengerNum) {
    const ticket = document.createElement('div');
    ticket.className = 'ticket';

    const flightData = flightType === 'departure' ? outboundFlightData : returnFlightData;
    const serviceData = passenger[flightType];
    
    const flightDetails = flights.find(f => f.flight_id === flightData.flightId);
    if (!flightDetails) {
        console.error('Flight not found:', flightData.flightId);
        ticket.innerHTML = '<p>Flight details not found</p>';
        return ticket;
    }

    let ticketPrice = flightData.price;
    ticketPrice += serviceData.luggage?.price || 0;
    ticketPrice += serviceData.meal?.price || 0;
    ticketPrice += serviceData.wifi?.price || 0;
    totalAmount += ticketPrice;

    const getMealTypeName = (type) => {
        const types = {
            'normal': 'Normal Meal',
            'vegetarian': 'Vegetarian Meal',
            'low-salt': 'Low Salt Meal',
            'diabetic': 'Diabetic Meal'
        };
        return types[type] || type;
    };

    ticket.innerHTML = `
        <div class="ticket-header">
            <div class="ticket-type">${flightType === 'departure' ? '✈️ Departure Flight' : '✈️ Return Flight'}</div>
            <div class="ticket-flight-id">${flightData.flightId}</div>
        </div>
        <div class="ticket-body">
            <div class="passenger-info">
                <div class="info-title">👤 Passenger Information</div>
                <div class="info-row">
                    <span class="info-label">Name:</span>
                    <span class="info-value">${passenger.title} ${passenger.firstName} ${passenger.lastName}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Passport:</span>
                    <span class="info-value">${passenger.passportNumber}</span>
                </div>
            </div>

            <div class="flight-route">
                <div class="route-airport">
                    <div class="route-time">${flightDetails.depart_time}</div>
                    <div class="route-code">${flightDetails.depart_airport_id}</div>
                    <div class="route-date">${formatDate(flightData.date)}</div>
                </div>
                <div class="route-arrow">→</div>
                <div class="route-airport">
                    <div class="route-time">${flightDetails.arrival_time}</div>
                    <div class="route-code">${flightDetails.arrival_airport_id}</div>
                    <div class="route-date">${formatDate(flightData.date)}</div>
                </div>
            </div>

            <div class="services-info">
                <div class="info-title">📋 Services</div>
                <div class="service-item">
                    <span class="service-label">💺 Seat:</span>
                    <span class="service-value">${serviceData.seat || 'Not assigned'}</span>
                </div>
                <div class="service-item">
                    <span class="service-label">🧳 Luggage:</span>
                    <span class="service-value">${serviceData.luggage?.weight || 20} kg ${(serviceData.luggage?.price || 0) > 0 ? '(+฿' + (serviceData.luggage.price).toLocaleString() + ')' : ''}</span>
                </div>
                <div class="service-item">
                    <span class="service-label">🍽️ Meal:</span>
                    <span class="service-value">${serviceData.meal?.selected ? getMealTypeName(serviceData.meal.type) + ' (+฿' + serviceData.meal.price + ')' : 'Not selected'}</span>
                </div>
                <div class="service-item">
                    <span class="service-label">📶 WiFi:</span>
                    <span class="service-value">${serviceData.wifi?.selected ? 'Yes (+฿' + serviceData.wifi.price + ')' : 'No'}</span>
                </div>
            </div>

            <div class="ticket-price">
                <span class="price-label">Ticket Price:</span>
                <span class="price-value">฿${ticketPrice.toLocaleString()}</span>
            </div>
        </div>
    `;

    return ticket;
}

// ============================================
// UPDATE SUMMARY
// ============================================
function updateSummary() {
    document.getElementById('total-passengers').textContent = totalPassengers;
    
    let totalFlights = totalPassengers;
    if (isRoundTrip) {
        totalFlights *= 2;
    }
    document.getElementById('total-flights').textContent = totalFlights;
    document.getElementById('total-amount').textContent = `฿${totalAmount.toLocaleString()}`;
}

// ============================================
// SELECT PAYMENT METHOD
// ============================================
function selectPayment(method) {
    selectedPaymentMethod = method;
    console.log('✅ Selected payment method:', method);
    
    document.querySelectorAll('.payment-option').forEach(option => {
        option.classList.remove('selected');
    });
    event.target.closest('.payment-option').classList.add('selected');
    
    document.getElementById('confirm-btn').disabled = false;
}

// ============================================
// CANCEL BOOKING - UPDATE STATUS TO FAILED AND RELEASE SEATS
// ============================================
async function cancelBooking() {
    if (!confirm('Are you sure you want to cancel? You will return to the seat selection page.')) {
        return;
    }
    
    const cancelBtn = event.target;
    cancelBtn.disabled = true;
    cancelBtn.textContent = 'Cancelling...';
    
    try {
        console.log('❌ Cancelling booking...');
        
        // ============================================
        // STEP 1: CREATE PASSENGERS (even for cancelled bookings)
        // ============================================
        for (let i = 0; i < passengersData.length; i++) {
            const passenger = passengersData[i];
            
            // Departure passenger
            const departureBookingId = bookingIds.find(b => b.type === 'departure').id;
            const departurePassengerData = {
                booking_id: departureBookingId,
                flight_id: outboundFlightData.flightId,
                fname: passenger.firstName,
                lname: passenger.lastName,
                passport_no: passenger.passportNumber,
                seat_no: passenger.departure.seat || 'Not assigned',
                luggage_weight: parseInt(passenger.departure.luggage?.weight) || 20,
                Meal: getMealCode(passenger.departure.meal?.type),
                Wifi: passenger.departure.wifi?.selected ? 1 : 0
            };
            
            await sendData('addPassenger', departurePassengerData);
            console.log(`✅ Departure passenger ${i + 1} created`);
            
            // Return passenger (if round trip)
            if (isRoundTrip && returnFlightData) {
                const returnBookingId = bookingIds.find(b => b.type === 'return').id;
                const returnPassengerData = {
                    booking_id: returnBookingId,
                    flight_id: returnFlightData.flightId,
                    fname: passenger.firstName,
                    lname: passenger.lastName,
                    passport_no: passenger.passportNumber,
                    seat_no: passenger.return.seat || 'Not assigned',
                    luggage_weight: parseInt(passenger.return.luggage?.weight) || 20,
                    Meal: getMealCode(passenger.return.meal?.type),
                    Wifi: passenger.return.wifi?.selected ? 1 : 0
                };
                
                await sendData('addPassenger', returnPassengerData);
                console.log(`✅ Return passenger ${i + 1} created`);
            }
        }
        
        // ============================================
        // STEP 2: RELEASE ALL SEATS (Make them available again)
        // ============================================
        console.log('🔓 Releasing seats...');
        
        for (let i = 0; i < passengersData.length; i++) {
            const passenger = passengersData[i];
            
            // Release departure seat
            if (passenger.departure.seat) {
                await sendData('releaseSeat', {
                    flight_id: outboundFlightData.flightId,
                    seat_id: passenger.departure.seat
                });
                console.log(`✅ Released departure seat: ${passenger.departure.seat}`);
            }
            
            // Release return seat
            if (isRoundTrip && returnFlightData && passenger.return.seat) {
                await sendData('releaseSeat', {
                    flight_id: returnFlightData.flightId,
                    seat_id: passenger.return.seat
                });
                console.log(`✅ Released return seat: ${passenger.return.seat}`);
            }
        }
        
        // ============================================
        // STEP 3: CREATE PAYMENT WITH STATUS "FAILED"
        // ============================================
        for (const booking of bookingIds) {
            const paymentData = {
                booking_id: booking.id,
                amount: totalAmount,
                payment_status: 'Failed'
            };
            
            await sendData('addPayment', paymentData);
            console.log(`✅ Failed payment recorded for booking ${booking.id}`);
            
            // Update booking status to "Failed"
            await sendData('updateBookingStatus', {
                booking_id: booking.id,
                status: 'Failed'
            });
            console.log(`✅ Booking ${booking.id} status updated to Failed`);
        }
        
        console.log('✅ Booking cancelled and seats released');
        alert('❌ Booking has been cancelled. Seats are now available for other customers.');
        
        // Go back to seat selection
        window.location.href = 'seat&service.html';
        
    } catch (error) {
        console.error('❌ Failed to cancel booking:', error);
        alert('Error cancelling booking: ' + error.message);
        cancelBtn.disabled = false;
        cancelBtn.textContent = 'Cancel';
    }
}

// ============================================
// HELPER FUNCTIONS
// ============================================
function getMealCode(mealType) {
    if (!mealType) return 0;
    const codes = {
        'normal': 1,
        'vegetarian': 2,
        'low-salt': 3,
        'diabetic': 4
    };
    return codes[mealType] || 0;
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

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
// CONFIRM PAYMENT - UPDATE STATUS TO PAID
// ============================================
async function confirmPayment() {
    console.log('💳 Confirming payment...');
    
    const selectedPayment = document.querySelector('input[name="payment"]:checked');
    if (!selectedPayment) {
        alert("⚠️ Please select a payment method before confirming!");
        return;
    }

    const paymentMethod = selectedPayment.value;
    const bookingRef = "BK" + Date.now();
    
    const confirmBtn = document.getElementById('confirm-btn');
    confirmBtn.disabled = true;
    confirmBtn.textContent = 'Processing...';

    try {
        console.log('📝 Creating passengers and payments...');
        
        // ============================================
        // STEP 1: CREATE PASSENGERS FOR EACH BOOKING
        // ============================================
        for (let i = 0; i < passengersData.length; i++) {
            const passenger = passengersData[i];
            
            // Departure passenger
            const departureBookingId = bookingIds.find(b => b.type === 'departure').id;
            const departurePassengerData = {
                booking_id: departureBookingId,
                flight_id: outboundFlightData.flightId,
                fname: passenger.firstName,
                lname: passenger.lastName,
                passport_no: passenger.passportNumber,
                seat_no: passenger.departure.seat || 'Not assigned',
                luggage_weight: parseInt(passenger.departure.luggage?.weight) || 20,
                Meal: getMealCode(passenger.departure.meal?.type),
                Wifi: passenger.departure.wifi?.selected ? 1 : 0
            };
            
            await sendData('addPassenger', departurePassengerData);
            console.log(`✅ Departure passenger ${i + 1} created`);
            
            // Return passenger (if round trip)
            if (isRoundTrip && returnFlightData) {
                const returnBookingId = bookingIds.find(b => b.type === 'return').id;
                const returnPassengerData = {
                    booking_id: returnBookingId,
                    flight_id: returnFlightData.flightId,
                    fname: passenger.firstName,
                    lname: passenger.lastName,
                    passport_no: passenger.passportNumber,
                    seat_no: passenger.return.seat || 'Not assigned',
                    luggage_weight: parseInt(passenger.return.luggage?.weight) || 20,
                    Meal: getMealCode(passenger.return.meal?.type),
                    Wifi: passenger.return.wifi?.selected ? 1 : 0
                };
                
                await sendData('addPassenger', returnPassengerData);
                console.log(`✅ Return passenger ${i + 1} created`);
            }
        }
        
        // ============================================
        // STEP 2: CREATE PAYMENTS AND UPDATE STATUS TO "PAID"
        // ============================================
        for (const booking of bookingIds) {
            const paymentData = {
                booking_id: booking.id,
                amount: totalAmount,
                payment_status: 'Paid'
            };
            
            await sendData('addPayment', paymentData);
            console.log(`✅ Payment created for booking ${booking.id}`);
            
            // Update booking status to "Paid"
            await sendData('updateBookingStatus', {
                booking_id: booking.id,
                status: 'Paid'
            });
            console.log(`✅ Booking ${booking.id} status updated to Paid`);
        }
        
        console.log('🎉 All operations completed!');
        
        // Save payment info for bookings page
        const paymentInfo = {
            bookingRef: bookingRef,
            totalPassengers: totalPassengers,
            totalFlights: isRoundTrip ? totalPassengers * 2 : totalPassengers,
            totalAmount: `฿${totalAmount.toLocaleString()}`,
            paymentMethod: paymentMethod,
            bookingDate: new Date().toISOString()
        };
        
        localStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));
        
        alert(`✅ Booking Confirmed!\n\nBooking Reference: ${bookingRef}\n\nThank you for your booking!`);
        
        // Redirect to bookings page
        window.location.href = 'bookings.html';
        
    } catch (error) {
        console.error('❌ BOOKING FAILED!', error);
        alert('❌ Booking failed: ' + error.message + '\n\nPlease check console for details.');
        
        confirmBtn.disabled = false;
        confirmBtn.textContent = 'Confirm Payment';
    }
}
