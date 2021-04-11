<?php
$servername = "br806.hostgator.com.br"; //"50.116.87.195";
$username = "hoplonte_admin";
$password = "root";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
echo "Connected successfully";
?>