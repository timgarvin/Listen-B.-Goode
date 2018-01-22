<?php
    /*Created by Tim Garvin
    Copyright © 2017 Tim Garvin*/

    //Sends Email after the Submit buton is clicked

    //Grabs values from form
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    //Sets From and To information for Email
    $from = 'From: Listen B. Goode';
    $to = 'tgarvintx@gmail.com';

    if($_POST['submit'])
    {
        //Sets up the Body of the Email
        $body = "From: $name\nEmail: $email\nSubject: $subject\nMessage:\n $message";

        //Displays successful message if Email was sent
        //Else: Displays error message if Email was not sent
        if(mail($to, $subject, $body, $from))
        {            
            echo '<p>Your message has been sent!</p>';
        }
        else
        {
            echo '<p>D\'OH! An error occurred. Try again!</p>';
        }
    }
?>