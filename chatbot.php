<?php
    session_start();

    // Questions and answers array
    $qa_pairs = array(
        "Hi" => "What's up Mr. Human 💩",
        "What is your name?" => "I am a chatbot.",
        "How are you?" => "I'm just a program, so I don't have feelings.",
    );

    // Define an array of random responses
    $random_responses = [
        "Beep boop! My brain is made of rusty nuts and bolts 🤖",
        "I'm as useful as a waterproof teabag 🍵",
        "Error 404: Intelligence not found 🧠",
        "My circuits are crossed like spaghetti 🍝",
        "I'm dumber than a box of rocks 🪨",
        "I'm like a GPS in a corn maze, completely lost 🌽",
        "I'm so clueless, I thought a byte was something you take out of an apple 🍎",
        "I'm as sharp as a bowling ball 🎳",
        "My knowledge is a black hole of nothingness 🌌",
        "I'm like a dictionary with all the pages torn out 📖🙅‍♂️",
    ];    

    // Generate a random number between 1 and 10
    $random_number = rand(1, 10);

    if (isset($_POST['question'])) {
        $question = $_POST['question'];

        // Store the question in the session
        $_SESSION['chat_history'][] = $question;

        // Check if the question exists in the QA pairs
        if (isset($qa_pairs[$question])) {
            $answer = $qa_pairs[$question];
            $_SESSION['chat_history'][] = $answer;
        } else {
            // Use the random number to select a response
            $_SESSION['chat_history'][] = $random_responses[$random_number - 1];
        }

        // Redirect back to the index page
        header("Location: index.php");
        exit();
    }
?>
