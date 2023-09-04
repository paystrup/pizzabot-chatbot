<?php
    session_start();
    session_destroy();

    // Redirect back to the index page
    header("Location: index.php");
    exit();
?>