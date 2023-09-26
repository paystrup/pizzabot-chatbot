<?php
    // Set the response content type to JSON
    header("Content-Type: application/json");

    // Path to the JSON file
    $jsonFilePath = '../../../data/messages.json';

    // Check if the request method is GET
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Check if the JSON file exists
        if (file_exists($jsonFilePath)) {
            // Read the JSON data from the file
            $jsonData = file_get_contents($jsonFilePath);

            // Output the JSON data
            echo $jsonData;
        } else {
            // JSON file not found, return a http error
            http_response_code(404);
            echo json_encode(["error" => "JSON file not found"]);
        }
    } else {
        // Method not allowed, return a http error
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed. Only GET is allowed"]);
    }
?>