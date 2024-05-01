<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    // Set the recipient email address
    $to = "thealoksinghh@gmail.com";

    // Set the subject of the email
    $subject = "New Form Submission";

    // Compose the email message
    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Message:\n$message";

    // Set additional headers
    $headers = "From: $email";

    // Attempt to send the email
    if (mail($to, $subject, $body, $headers)) {
        echo "Thank you for your submission. We will get back to you soon.";
    } else {
        echo "Oops! Something went wrong, and we couldn't send your message.";
    }
}
?>
