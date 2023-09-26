<?php
    session_start();

    // TODO: send session data to SQL DB to store prev chats
    // For now just a simple session store + session delete

    // Check if request method is DELETE
    if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        // Check if chatHistory array exists in the session; if not send error response
        if (isset($_SESSION['chatHistory'])) {
            // https://devdocs.io/http/status/205
            http_response_code(205); // Reset Content response
            $_SESSION['chatHistory'] = [];
            exit();
        } else {
            http_response_code(404); // Not Found
            echo json_encode(array('status' => 'error', 'message' => 'No chat history found in PHP Session'));
        }
    } else {
        http_response_code(405); // Method Not Allowed
        echo json_encode(array('status' => 'error', 'message' => 'Only DELETE requests are allowed'));
        exit;
    }
?>
