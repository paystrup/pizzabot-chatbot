<?php
    session_start();

    // Include the findAnswer function
    include('findAnswer.php');
    
    // Set the response content type to JSON
    header("Content-Type: application/json");

    // Init chat history if it doesn't exist
    if (!isset($_SESSION["chatHistory"])) {
        $_SESSION["chatHistory"] = [];
    }

    // Handle post request
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        // Get the JSON data sent from the client
        $data = file_get_contents("php://input");
        $requestData = json_decode($data);

        // Check if the JSON data is valid
        if ($requestData === null) {
            http_response_code(400); // Bad Request
            echo json_encode(["error" => "Invalid JSON data"]);
            exit();
        }

        // Check if the "question" field is present and not empty
        if (isset($requestData->question) && trim($requestData->question) != "") {
            $question = $requestData->question;
            $answer = findAnswer($question);
            $timestamp = date('Y-m-d H:i');
            $chat_id = uniqid();

            $qaPair = [
                'question' => $question,
                'answer' => $answer,
                'timestamp' => $timestamp,
                'chat_id' => $chat_id,
            ];

            $qaPairUser = [
                'message' => $question,
                'user' => "user",
                'timestamp' => $timestamp,
                'chat_id' => $chat_id,
            ];

            $qaPairServer = [
                'message' => $answer,
                'user' => "server",
                'timestamp' => $timestamp,
                'chat_id' => $chat_id,
            ];

            // Add the chat entry to the chat history
            $_SESSION['chatHistory'][] = $qaPairUser;
            $_SESSION['chatHistory'][] = $qaPairServer;

            // Send the chat entry back to the client
            echo json_encode($qaPair);
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(["error" => "Invalid request. Question is missing or empty."]);
        }
    } else {
        http_response_code(405); // Method Not Allowed
        header("Allow: POST");
    }
?>
