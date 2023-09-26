<?php 
    function findAnswer($query) {
        // Load the JSON array of messages from the static file
        $jsonFilePath = __DIR__ . '../../data/messages.json'; 
        $messages = json_decode(file_get_contents($jsonFilePath), true);

        // Initialize a default response array
        $defaultResponse = [];

        // Load the JSON array of default answers from the file
        $defaultAnswersFilePath = __DIR__ . '../../../../data/defaultAnswers.json';
        $defaultAnswers = json_decode(file_get_contents($defaultAnswersFilePath), true);

        // Loop through each message in the messages array
        foreach ($messages as $message) {
            // Check if the query contains any of the keywords or if the keyword is found in the query
            foreach ($message['keywords'] as $keyword) {
                if (stripos($query, $keyword) !== false) {
                    $answers = $message['answers'];
                    return $answers[array_rand($answers)]; // Return a random answer
                }
            }

            // Check if the query is found in the message
            if (stripos($message['question'], $query) !== false) {
                $answers = $message['answers'];
                return $answers[array_rand($answers)]; // Return a random answer
            }
        }

        // If no answer is found in messages, select a random default response
        if (!empty($defaultAnswers)) {
            $defaultResponse = $defaultAnswers[array_rand($defaultAnswers)];
        }

        // If no answer is found, return the default response as a string
        return $defaultResponse['answer'] ?? "I'm sorry, I don't have an answer for that.";
    }
?>