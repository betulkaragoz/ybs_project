<?php

    header("Access-Control-Allow-Origin: *"); //add this CORS header to enable any domain to send HTTP requests to these endpoints:
    
    $conn = mysqli_connect("localhost","root","","ybs_project_database");
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    // Query to fetch data from database
    $sql = "SELECT * FROM is_kazasi_kaydi";
    $result = $conn->query($sql);
 
    
    $data = array();
    
    if ($result->num_rows > 0) {
        // Fetch data from result set
        while ($row = $result->fetch_assoc()) {
            $data[] = $row; 
        }
    }


    
    // Close connection
    $conn->close();
    
    // Return data as JSON
    header('Content-Type: application/json');
    echo json_encode($data);
?>