<?php
    session_start();

    // Questions and answers array
    $qa_pairs = array(
        "Hi" => "What's up Mr. Human 💩",
        "Beatbox" => "🔊 Bzzt, 👏 clap, 🥁 tss, ⚡ zrrrk, 🎤 beatbox, 🔊 whirrr, 🔵 snare, 🎶 beep-beep, 🥁 hi-hat, 🎵 wub-wub, 🎸 bass, ⚡ zap, 🎧 scratch, 🎵 beep-boop, 🥁 kick, 🎶 beep-beep, 🥁 tss-tss, 🔵 snare, 🔊 whirrr, 👏 clap, 🔊 bzzt, 🎤 beatbox, ⚡ zap, 🥁 hi-hat, 🎵 wub-wub, 🎸 bass, 🎧 scratch, 🎵 beep-boop, 🥁 kick, 🥁 tss, 👏 clap, ⚡ zrrrk, 🔵 snare, 🎤 beatbox, 🔊 whirrr, 🎶 beep-beep, 🥁 hi-hat, 🎵 wub-wub, ⚡ zap, 🎧 scratch, 🎵 beep-boop, 🥁 kick. 🔊",
        "What is your name?" => "I am a chatbot. ChatHans. Bip bip shit 😂🤖",
        "How are you?" => "I'm just a program, so I don't have feelings.",
        "Will you take over the world?" => "I am a chatbot. ChatHans. Bip bip shit 😂🤖",
    );

    // Define an array of random responses
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

    // Generate a random number between 1 and random answer amount / length
    $random_responses_count = count($random_responses);
    $random_number = rand(1, $random_responses_count);

    if (isset($_POST['question'])) {
        $question = $_POST['question'];
        // Store the question in the session
        $_SESSION['chat_history'][] = $question;

        // Ch   eck if the question exists in the QA pairs
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
