<?php
    // Start session, so we can use it to store chat history
    session_start();

    // Get users timezone for timestamp used later
    $timezone = $_SESSION['time'];
    date_default_timezone_set($timezone);

    // Questions and answers array
    $qa_pairs = [
        "Hi" => "What's up Mr. Human 💩",
        "Beatbox" => "🔊 Bzzt, 👏 clap, 🥁 tss, ⚡ zrrrk, 🎤 beatbox, 🔊 whirrr, 🔵 snare, 🎶 beep-beep, 🥁 hi-hat, 🎵 wub-wub, 🎸 bass, ⚡ zap, 🎧 scratch, 🎵 beep-boop, 🥁 kick, 🎶 beep-beep, 🥁 tss-tss, 🔵 snare, 🔊 whirrr, 👏 clap, 🔊 bzzt, 🎤 beatbox, ⚡ zap, 🥁 hi-hat, 🎵 wub-wub, 🎸 bass, 🎧 scratch, 🎵 beep-boop, 🥁 kick, 🥁 tss, 👏 clap, ⚡ zrrrk, 🔵 snare, 🎤 beatbox, 🔊 whirrr, 🎶 beep-beep, 🥁 hi-hat, 🎵 wub-wub, ⚡ zap, 🎧 scratch, 🎵 beep-boop, 🥁 kick. 🔊",
        "What is your name?" => "I am a chatbot. ChatHans. Bip bip shit 😂🤖",
        "How are you?" => "I'm just a program, so I don't have feelings.",
        "Will you take over the world?" => "I am a chatbot. ChatHans. Bip bip shit 😂🤖",
    ];

    // Define an array of random responses
    // Used so the user won't be exposed to the same answer over and over again
    $random_responses = [
        "I don't know. Beep boop! My brain is made of rusty nuts and bolts 🤖",
        "I don't know. I'm as useful as a waterproof teabag 🍵",
        "I don't know. Error 404: Intelligence not found 🧠",
        "I don't know. My circuits are crossed like spaghetti 🍝",
        "I don't know. I'm dumber than a box of rocks 🪨",
        "I don't know. I'm like a GPS in a corn maze, completely lost 🌽",
        "I don't know. I'm so clueless, I thought a byte was something you take out of an apple 🍎",
        "I don't know. Bing bong bip bip beep 🎳",
        "I don't know. My knowledge is a black hole of nothingness 🌌",
        "I don't know. I'm like a dictionary with all the pages torn out 📖🙅‍♂️",
    ];

    // Initialize chat history if it doesn't exist in the session
    if (!isset($_SESSION['chat_history'])) {
        $_SESSION['chat_history'] = [];
    }

    if (isset($_POST['question'])) {
        $question = $_POST['question'];

        // Check if the question exists in the QA pairs
        if (isset($qa_pairs[$question])) {
            $answer = $qa_pairs[$question];
        } else {
            // Generate a random number to select a response
            $random_number = rand(0, count($random_responses) - 1);
            $answer = $random_responses[$random_number];
        }
        
        // Create a chat entry with timestamp and unique chat ID
        $chat_entry = [
            'question' => $question,
            'answer' => $answer,
            'timestamp' => date('Y-m-d H:i'),
            'chat_id' => uniqid(), // Generate a unique chat ID
        ];

        // Add the chat entry to the chat history
        $_SESSION['chat_history'][] = $chat_entry;
        
        // Redirect back to the index page
        header("Location: index.php");
        exit();
    }
?>
