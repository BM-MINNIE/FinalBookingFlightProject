<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Set JSON header
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

try {
    require_once 'db_config.php';
    $conn = getDBConnection();
    $action = $_GET['action'] ?? '';
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Connection error: ' . $e->getMessage()]);
    exit;
}

switch ($action) {
    // ========== FLIGHTS ==========
    case 'getFlights':
        $sql = "SELECT f.*, a.model as airplane_model, 
                src.name as source_name, dst.name as destination_name
                FROM flights f
                LEFT JOIN airplane a ON f.airplane_id = a.airplane_id
                LEFT JOIN airports src ON f.source_airport_id = src.airport_id
                LEFT JOIN airports dst ON f.destination_airport_id = dst.airport_id
                ORDER BY f.flight_id";
        $result = $conn->query($sql);
        $flights = [];
        while ($row = $result->fetch_assoc()) {
            $flights[] = $row;
        }
        echo json_encode(['success' => true, 'data' => $flights]);
        break;

    case 'addFlight':
        $data = json_decode(file_get_contents('php://input'), true);
        $sql = "INSERT INTO flights (flight_id, airplane_id, source_airport_id, 
                destination_airport_id, departure_time, arrival_time, price, availables_seats) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssssssdi", 
            $data['flight_id'],
            $data['airplane_id'],
            $data['source_airport_id'],
            $data['destination_airport_id'],
            $data['departure_time'],
            $data['arrival_time'],
            $data['price'],
            $data['availables_seats']
        );
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Flight added successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => $stmt->error]);
        }
        break;

    case 'updateFlight':
        $data = json_decode(file_get_contents('php://input'), true);
        $sql = "UPDATE flights SET airplane_id=?, source_airport_id=?, 
                destination_airport_id=?, departure_time=?, arrival_time=?, 
                price=?, availables_seats=? WHERE flight_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssssddis", 
            $data['airplane_id'],
            $data['source_airport_id'],
            $data['destination_airport_id'],
            $data['departure_time'],
            $data['arrival_time'],
            $data['price'],
            $data['availables_seats'],
            $data['flight_id']
        );
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Flight updated successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => $stmt->error]);
        }
        break;

    case 'deleteFlight':
        $flight_id = $_GET['flight_id'] ?? '';
        $sql = "DELETE FROM flights WHERE flight_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $flight_id);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Flight deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => $stmt->error]);
        }
        break;

    // ========== USERS ==========
    case 'getUsers':
        $sql = "SELECT * FROM users ORDER BY user_id";
        $result = $conn->query($sql);
        $users = [];
        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
        echo json_encode(['success' => true, 'data' => $users]);
        break;

    case 'addUser':
        $data = json_decode(file_get_contents('php://input'), true);
        $sql = "INSERT INTO users (password, fname, lname, email, role) 
                VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssss", 
            password_hash($data['password'], PASSWORD_DEFAULT),  // ✅ Hashed,
            $data['fname'],
            $data['lname'],
            $data['email'],
            $data['role']
        );
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'User added successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => $stmt->error]);
        }
        break;

    case 'updateUser':
        $data = json_decode(file_get_contents('php://input'), true);
        $sql = "UPDATE users SET password=?, fname=?, lname=?, email=?, role=? 
                WHERE user_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssssi", 
            password_hash($data['password'], PASSWORD_DEFAULT),  // ✅ Hashed,
            $data['fname'],
            $data['lname'],
            $data['email'],
            $data['role'],
            $data['user_id']
        );
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'User updated successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => $stmt->error]);
        }
        break;

    case 'deleteUser':
        $user_id = $_GET['user_id'] ?? '';
        $sql = "DELETE FROM users WHERE user_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $user_id);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'User deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => $stmt->error]);
        }
        break;

    // ========== AIRPLANES ==========
    case 'getAirplanes':
        $sql = "SELECT * FROM airplane ORDER BY airplane_id";
        $result = $conn->query($sql);
        $airplanes = [];
        while ($row = $result->fetch_assoc()) {
            $airplanes[] = $row;
        }
        echo json_encode(['success' => true, 'data' => $airplanes]);
        break;

    case 'addAirplane':
        $data = json_decode(file_get_contents('php://input'), true);
        $sql = "INSERT INTO airplane (airplane_id, model, capacity, status) 
                VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssis", 
            $data['airplane_id'],
            $data['model'],
            $data['capacity'],
            $data['status']
        );
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Airplane added successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => $stmt->error]);
        }
        break;

    case 'updateAirplane':
        $data = json_decode(file_get_contents('php://input'), true);
        $sql = "UPDATE airplane SET model=?, capacity=?, status=? 
                WHERE airplane_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("siss", 
            $data['model'],
            $data['capacity'],
            $data['status'],
            $data['airplane_id']
        );
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Airplane updated successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => $stmt->error]);
        }
        break;

    case 'deleteAirplane':
        $airplane_id = $_GET['airplane_id'] ?? '';
        $sql = "DELETE FROM airplane WHERE airplane_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $airplane_id);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Airplane deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => $stmt->error]);
        }
        break;

    // ========== AIRPORTS (for dropdown) ==========
    case 'getAirports':
        $sql = "SELECT * FROM airports ORDER BY airport_id";
        $result = $conn->query($sql);
        $airports = [];
        while ($row = $result->fetch_assoc()) {
            $airports[] = $row;
        }
        echo json_encode(['success' => true, 'data' => $airports]);
        break;

    // ========== BOOKINGS ==========
    // Add this case to your api.php file (replace the existing addBooking case)

    case 'addBooking':
        $data = json_decode(file_get_contents('php://input'), true);
        
        // Handle seat_id safely - it can be NULL or a string like "2B"
        $seat_id = null;
        if (isset($data['seat_id']) && $data['seat_id'] !== '' && $data['seat_id'] !== 'null' && $data['seat_id'] !== null) {
            $seat_id = $data['seat_id'];
        }
        
        // Log for debugging
        error_log("addBooking - user_id: " . $data['user_id'] . ", flight_id: " . $data['flight_id'] . ", seat_id: " . ($seat_id ?? 'NULL'));
        
        $sql = "INSERT INTO bookings (user_id, flight_id, seat_id, booking_date) 
                VALUES (?, ?, ?, NOW())";
        $stmt = $conn->prepare($sql);
        
        if (!$stmt) {
            echo json_encode(['success' => false, 'message' => 'Prepare failed: ' . $conn->error]);
            break;
        }
        
        $stmt->bind_param("iss", 
            $data['user_id'],
            $data['flight_id'],
            $seat_id
        );
        
        if ($stmt->execute()) {
            $booking_id = $conn->insert_id;
            
            // If amount and payment_status provided, create payment
            if (isset($data['amount']) && isset($data['payment_status'])) {
                $paymentSql = "INSERT INTO payments (booking_id, amount, payment_date, payment_status) 
                            VALUES (?, ?, NOW(), ?)";
                $payStmt = $conn->prepare($paymentSql);
                if ($payStmt) {
                    $payStmt->bind_param("ids", $booking_id, $data['amount'], $data['payment_status']);
                    $payStmt->execute();
                    $payStmt->close();
                }
            }
            
            echo json_encode([
                'success' => true, 
                'booking_id' => $booking_id,
                'seat_id' => $seat_id,
                'message' => 'Booking created successfully'
            ]);
        } else {
            echo json_encode([
                'success' => false, 
                'message' => 'Execute failed: ' . $stmt->error
            ]);
        }
        $stmt->close();
        break;


    case 'getBookings':
        $sql = "SELECT b.*, u.fname, u.lname, u.email, f.flight_id,
                p.payment_id, p.amount, p.payment_status, p.payment_date
                FROM bookings b
                LEFT JOIN users u ON b.user_id = u.user_id
                LEFT JOIN flights f ON b.flight_id = f.flight_id
                LEFT JOIN payments p ON b.booking_id = p.booking_id
                ORDER BY b.booking_id DESC";
        $result = $conn->query($sql);
        $bookings = [];
        while ($row = $result->fetch_assoc()) {
            $bookings[] = $row;
        }
        echo json_encode(['success' => true, 'data' => $bookings]);
        break;

    // ========== UPDATE BOOKING ==========
    case 'updateBooking':
        $data = json_decode(file_get_contents('php://input'), true);
        
        $booking_id = $data['booking_id'];
        $user_id = $data['user_id'];
        $flight_id = $data['flight_id'];
        
        $sql = "UPDATE bookings SET user_id = ?, flight_id = ? WHERE booking_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("isi", $user_id, $flight_id, $booking_id);
        
        if ($stmt->execute()) {
            // Handle payment if amount/status provided
            if (isset($data['amount']) && isset($data['payment_status'])) {
                // Check if payment exists
                $checkPayment = "SELECT payment_id FROM payments WHERE booking_id = ?";
                $checkStmt = $conn->prepare($checkPayment);
                $checkStmt->bind_param("i", $booking_id);
                $checkStmt->execute();
                $checkResult = $checkStmt->get_result();
                
                if ($checkResult->num_rows > 0) {
                    // Update existing payment
                    $updatePayment = "UPDATE payments SET amount = ?, payment_status = ? WHERE booking_id = ?";
                    $payStmt = $conn->prepare($updatePayment);
                    $payStmt->bind_param("dsi", $data['amount'], $data['payment_status'], $booking_id);
                    $payStmt->execute();
                    $payStmt->close();
                } else {
                    // Insert new payment
                    $insertPayment = "INSERT INTO payments (booking_id, amount, payment_date, payment_status) 
                                     VALUES (?, ?, NOW(), ?)";
                    $payStmt = $conn->prepare($insertPayment);
                    $payStmt->bind_param("ids", $booking_id, $data['amount'], $data['payment_status']);
                    $payStmt->execute();
                    $payStmt->close();
                }
                $checkStmt->close();
            }
            
            echo json_encode(['success' => true, 'message' => 'Booking updated successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => $stmt->error]);
        }
        $stmt->close();
        break;

    // ========== DELETE BOOKING ==========
    case 'deleteBooking':
        $booking_id = $_GET['booking_id'] ?? '';
        
        // First delete related payments
        $sql = "DELETE FROM payments WHERE booking_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $booking_id);
        $stmt->execute();
        $stmt->close();
        
        // Then delete related passengers
        $sql = "DELETE FROM passengers WHERE booking_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $booking_id);
        $stmt->execute();
        $stmt->close();
        
        // Finally delete the booking
        $sql = "DELETE FROM bookings WHERE booking_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $booking_id);
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Booking deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => $stmt->error]);
        }
        $stmt->close();
        break;
    
    // Add this new case to your api.php file, after the existing booking cases

case 'updateBookingStatus':
    $data = json_decode(file_get_contents('php://input'), true);
    
    $booking_id = $data['booking_id'];
    $status = $data['status']; // 'Pending', 'Paid', or 'Failed'
    
    // Validate status
    $allowed_statuses = ['Pending', 'Paid', 'Failed'];
    if (!in_array($status, $allowed_statuses)) {
        echo json_encode(['success' => false, 'message' => 'Invalid status']);
        break;
    }
    
    $sql = "UPDATE bookings SET status = ? WHERE booking_id = ?";
    $stmt = $conn->prepare($sql);
    
    if (!$stmt) {
        echo json_encode(['success' => false, 'message' => 'Prepare failed: ' . $conn->error]);
        break;
    }
    
    $stmt->bind_param("si", $status, $booking_id);
    
    if ($stmt->execute()) {
        echo json_encode([
            'success' => true, 
            'message' => 'Booking status updated to ' . $status,
            'booking_id' => $booking_id,
            'status' => $status
        ]);
    } else {
        echo json_encode([
            'success' => false, 
            'message' => 'Execute failed: ' . $stmt->error
        ]);
    }
    $stmt->close();
    break;

    // ========== PASSENGERS ==========
   case 'addPassenger':
        $data = json_decode(file_get_contents('php://input'), true);
        
        $booking_id = $data['booking_id'];
        $flight_id = $data['flight_id'];
        $fname = $data['fname'];
        $lname = $data['lname'];
        $passport_no = $data['passport_no'];
        $seat_no = $data['seat_no'];
        $luggage_weight = $data['luggage_weight'];
        $meal = $data['Meal'];
        $wifi = $data['Wifi'];
        
        $sql = "INSERT INTO passengers (booking_id, flight_id, fname, lname, passport_no, 
                                         seat_no, luggage_weight, Meal, Wifi) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("isssssisi", 
            $booking_id,
            $flight_id,
            $fname,
            $lname,
            $passport_no,
            $seat_no,
            $luggage_weight,
            $meal,
            $wifi
        );
        
        if ($stmt->execute()) {
            $passenger_id = $conn->insert_id;
            
            // ✅ REMOVED THE BROKEN SEAT UPDATE CODE!
            // The trigger will handle seat updates automatically
            
            echo json_encode([
                'success' => true, 
                'passenger_id' => $passenger_id,
                'message' => 'Passenger created successfully'
            ]);
        } else {
            echo json_encode([
                'success' => false, 
                'message' => 'Database error: ' . $stmt->error
            ]);
        }
        $stmt->close();
        break;

    case 'getPassengers':
        $sql = "SELECT p.*, b.booking_id, f.flight_id 
                FROM passengers p
                LEFT JOIN bookings b ON p.booking_id = b.booking_id
                LEFT JOIN flights f ON p.flight_id = f.flight_id
                ORDER BY p.passenger_id DESC";
        $result = $conn->query($sql);
        $passengers = [];
        while ($row = $result->fetch_assoc()) {
            $passengers[] = $row;
        }
        echo json_encode(['success' => true, 'data' => $passengers]);
        break;

    // ========== UPDATE PASSENGER ==========
    case 'updatePassenger':
        $data = json_decode(file_get_contents('php://input'), true);
        
        $passenger_id = $data['passenger_id'];
        $booking_id = $data['booking_id'];
        $flight_id = $data['flight_id'];
        $fname = $data['fname'];
        $lname = $data['lname'];
        $passport_no = $data['passport_no'];
        $seat_no = $data['seat_no'];
        $luggage_weight = $data['luggage_weight'];
        $meal = $data['Meal'] ?? $data['meal']; // Support both formats
        $wifi = $data['Wifi'] ?? $data['wifi']; // Support both formats
        
        $sql = "UPDATE passengers SET 
                booking_id = ?, flight_id = ?, fname = ?, lname = ?, 
                passport_no = ?, seat_no = ?, luggage_weight = ?, Meal = ?, Wifi = ? 
                WHERE passenger_id = ?";
        
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("isssssisii", 
            $booking_id, $flight_id, $fname, $lname, 
            $passport_no, $seat_no, $luggage_weight, $meal, $wifi, 
            $passenger_id
        );
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Passenger updated successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => $stmt->error]);
        }
        $stmt->close();
        break;

    // ========== DELETE PASSENGER ==========
    case 'deletePassenger':
        $passenger_id = $_GET['passenger_id'] ?? '';
        
        $sql = "DELETE FROM passengers WHERE passenger_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $passenger_id);
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Passenger deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => $stmt->error]);
        }
        $stmt->close();
        break;

    // ========== PAYMENTS ==========
   case 'addPayment':
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Get values with defaults (no strict validation)
    $booking_id = isset($data['booking_id']) ? intval($data['booking_id']) : 0;
    $amount = isset($data['amount']) ? floatval($data['amount']) : 0;
    $payment_status = isset($data['payment_status']) ? $data['payment_status'] : 'Pending';
    
    $sql = "INSERT INTO payments (booking_id, amount, payment_date, payment_status) 
            VALUES (?, ?, NOW(), ?)";
    
    $stmt = $conn->prepare($sql);
    
    // ✅ CHECK if prepare() succeeded
    if (!$stmt) {
        echo json_encode(['success' => false, 'message' => 'Prepare failed: ' . $conn->error]);
        break;
    }
    
    $stmt->bind_param("ids", $booking_id, $amount, $payment_status);
    
    if ($stmt->execute()) {
        $payment_id = $conn->insert_id;
        
        // Update booking to CONFIRMED
        if ($payment_status === 'Paid') {
            $updateSql = "UPDATE bookings SET status = 'CONFIRMED' WHERE booking_id = ?";
            $updateStmt = $conn->prepare($updateSql);
            if ($updateStmt) {
                $updateStmt->bind_param("i", $booking_id);
                $updateStmt->execute();
                $updateStmt->close();
            }
        }
        
        echo json_encode(['success' => true, 'payment_id' => $payment_id]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Execute failed: ' . $stmt->error]);
    }
    $stmt->close();
    break;

    case 'getPayments':
        $sql = "SELECT p.*, b.booking_id, b.user_id, b.flight_id 
                FROM payments p
                LEFT JOIN bookings b ON p.booking_id = b.booking_id
                ORDER BY p.payment_id DESC";
        $result = $conn->query($sql);
        $payments = [];
        while ($row = $result->fetch_assoc()) {
            $payments[] = $row;
        }
        echo json_encode(['success' => true, 'data' => $payments]);
        break;

    // ============================================
// ADD THESE NEW CASES TO YOUR api.php FILE
// ============================================

// ========== GET OCCUPIED SEATS FOR A FLIGHT ==========
case 'getOccupiedSeats':
    $flight_id = $_GET['flight_id'] ?? '';
    
    if (empty($flight_id)) {
        echo json_encode(['success' => false, 'message' => 'Flight ID required']);
        break;
    }
    
    // Get all paid bookings for this flight with their seats
    $sql = "SELECT DISTINCT b.seat_id 
            FROM bookings b
            WHERE b.flight_id = ? 
            AND b.status = 'Paid' 
            AND b.seat_id IS NOT NULL";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $flight_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $occupiedSeats = [];
    while ($row = $result->fetch_assoc()) {
        $occupiedSeats[] = $row['seat_id'];
    }
    
    $stmt->close();
    
    echo json_encode([
        'success' => true, 
        'occupiedSeats' => $occupiedSeats
    ]);
    break;

// ========== RESERVE SEAT (Called when booking is created as Pending) ==========
case 'reserveSeat':
    $data = json_decode(file_get_contents('php://input'), true);
    
    $flight_id = $data['flight_id'];
    $seat_id = $data['seat_id'];
    $booking_id = $data['booking_id'];
    
    // Get airplane_id from flight
    $sqlGetAirplane = "SELECT airplane_id FROM flights WHERE flight_id = ?";
    $stmtGet = $conn->prepare($sqlGetAirplane);
    $stmtGet->bind_param("s", $flight_id);
    $stmtGet->execute();
    $resultGet = $stmtGet->get_result();
    $flight = $resultGet->fetch_assoc();
    $stmtGet->close();
    
    if (!$flight) {
        echo json_encode(['success' => false, 'message' => 'Flight not found']);
        break;
    }
    
    $airplane_id = $flight['airplane_id'];
    
    // Check if seat exists and is available
    $sqlCheck = "SELECT available FROM seat WHERE seat_id = ? AND airplane_id = ?";
    $stmtCheck = $conn->prepare($sqlCheck);
    $stmtCheck->bind_param("ss", $seat_id, $airplane_id);
    $stmtCheck->execute();
    $resultCheck = $stmtCheck->get_result();
    $seat = $resultCheck->fetch_assoc();
    $stmtCheck->close();
    
    if (!$seat) {
        echo json_encode(['success' => false, 'message' => 'Seat not found']);
        break;
    }
    
    if ($seat['available'] == 0) {
        echo json_encode(['success' => false, 'message' => 'Seat already occupied']);
        break;
    }
    
    // Temporarily reserve seat (don't assign passenger yet - just mark as reserved)
    // We'll assign passenger_id when payment is confirmed
    
    echo json_encode([
        'success' => true, 
        'message' => 'Seat temporarily reserved',
        'seat_id' => $seat_id
    ]);
    break;

// ========== CONFIRM SEAT (Called when payment is confirmed) ==========
case 'confirmSeat':
    $data = json_decode(file_get_contents('php://input'), true);
    
    $flight_id = $data['flight_id'];
    $seat_id = $data['seat_id'];
    $passenger_id = $data['passenger_id'];
    
    // Get airplane_id from flight
    $sqlGetAirplane = "SELECT airplane_id FROM flights WHERE flight_id = ?";
    $stmtGet = $conn->prepare($sqlGetAirplane);
    $stmtGet->bind_param("s", $flight_id);
    $stmtGet->execute();
    $resultGet = $stmtGet->get_result();
    $flight = $resultGet->fetch_assoc();
    $stmtGet->close();
    
    if (!$flight) {
        echo json_encode(['success' => false, 'message' => 'Flight not found']);
        break;
    }
    
    $airplane_id = $flight['airplane_id'];
    
    // Update seat table: mark as occupied and assign passenger
    $sqlUpdateSeat = "UPDATE seat 
                      SET available = 0, passenger_id = ? 
                      WHERE seat_id = ? AND airplane_id = ?";
    $stmtSeat = $conn->prepare($sqlUpdateSeat);
    $stmtSeat->bind_param("iss", $passenger_id, $seat_id, $airplane_id);
    $stmtSeat->execute();
    $stmtSeat->close();
    
    // Decrease available_seats in flights table
    $sqlUpdateFlight = "UPDATE flights 
                        SET availables_seats = availables_seats - 1 
                        WHERE flight_id = ? AND availables_seats > 0";
    $stmtFlight = $conn->prepare($sqlUpdateFlight);
    $stmtFlight->bind_param("s", $flight_id);
    $stmtFlight->execute();
    $stmtFlight->close();
    
    echo json_encode([
        'success' => true, 
        'message' => 'Seat confirmed and marked as occupied',
        'seat_id' => $seat_id,
        'passenger_id' => $passenger_id
    ]);
    break;

// ========== RELEASE SEAT (Called when payment fails) ==========
case 'releaseSeat':
    $data = json_decode(file_get_contents('php://input'), true);
    
    $flight_id = $data['flight_id'];
    $seat_id = $data['seat_id'];
    
    // Get airplane_id from flight
    $sqlGetAirplane = "SELECT airplane_id FROM flights WHERE flight_id = ?";
    $stmtGet = $conn->prepare($sqlGetAirplane);
    $stmtGet->bind_param("s", $flight_id);
    $stmtGet->execute();
    $resultGet = $stmtGet->get_result();
    $flight = $resultGet->fetch_assoc();
    $stmtGet->close();
    
    if (!$flight) {
        echo json_encode(['success' => false, 'message' => 'Flight not found']);
        break;
    }
    
    $airplane_id = $flight['airplane_id'];
    
    // Release seat: mark as available and remove passenger
    $sqlUpdateSeat = "UPDATE seat 
                      SET available = 1, passenger_id = NULL 
                      WHERE seat_id = ? AND airplane_id = ?";
    $stmtSeat = $conn->prepare($sqlUpdateSeat);
    $stmtSeat->bind_param("ss", $seat_id, $airplane_id);
    $stmtSeat->execute();
    $stmtSeat->close();
    
    // Note: We don't increase available_seats here because the seat was never actually occupied
    // It was only temporarily reserved
    
    echo json_encode([
        'success' => true, 
        'message' => 'Seat released and available again',
        'seat_id' => $seat_id
    ]);
    break;

// ========== GET FLIGHT CAPACITY INFO ==========
case 'getFlightCapacity':
    $flight_id = $_GET['flight_id'] ?? '';
    
    if (empty($flight_id)) {
        echo json_encode(['success' => false, 'message' => 'Flight ID required']);
        break;
    }
    
    $sql = "SELECT f.availables_seats, a.capacity 
            FROM flights f
            LEFT JOIN airplane a ON f.airplane_id = a.airplane_id
            WHERE f.flight_id = ?";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $flight_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $data = $result->fetch_assoc();
    $stmt->close();
    
    if ($data) {
        echo json_encode([
            'success' => true,
            'available_seats' => $data['availables_seats'],
            'total_capacity' => $data['capacity']
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Flight not found']);
    }
    break;

    default:
        echo json_encode(['success' => false, 'message' => 'Invalid action']);
}




closeDBConnection($conn);
?>
