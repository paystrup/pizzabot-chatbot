<?php
    session_start();
    header("Content-Type: application/json");

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if (!isset($_SESSION["chatHistory"])) {
            $_SESSION["chatHistory"] = [];
        }

        // Convert the PHP array to JSON and echo it
        // So that the client can read it
        echo json_encode($_SESSION["chatHistory"]);

    } else {
        http_response_code(405); // Method Not Allowed
        echo json_encode(array('status' => 'error', 'message' => 'Only GET requests are allowed'));
        exit;
    }
?>