<?php
    // Set the response content type to JSON
    header("Content-Type: application/json");

    // Path to the JSON file
    $jsonFilePath = '../../../data/defaultAnswers.json';

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
?>
