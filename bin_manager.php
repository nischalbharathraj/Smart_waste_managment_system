<?php
$servername = "localhost";
$username = "root"; // Default username for XAMPP
$password = ""; // Default password for XAMPP (usually empty)
$dbname = "waste_management"; // Change this to your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle POST request to add a new bin
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $location = $_POST['location'];
    $fill_level = $_POST['fill_level'];
    $type = $_POST['type'];

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO bins (location, fill_level, type) VALUES (?, ?, ?)");
    $stmt->bind_param("sis", $location, $fill_level, $type);

    if ($stmt->execute()) {
        echo "New bin added successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

// Handle GET request to retrieve existing bins
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM bins");

    $bins = [];
    while ($row = $result->fetch_assoc()) {
        $bins[] = $row;
    }

    echo json_encode($bins);
}

$conn->close();
?>
