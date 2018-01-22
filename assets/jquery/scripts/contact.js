/* Created by Tim Garvin
Copyright © 2017 Tim Garvin */

$(document).ready(function() {
	//Error Checking: Checks that all required fields have been filled in
	$("#btnSubmit").click( function() {
        if(!$('#txtEmail').val()) //Checks if Email has been filled in
        {
            //Prints error message if Email has not been filled in
            $('#txtEmail').next().css("color", "red");
            $('error').text("Error: Please fill out all required fields.");
        }
        else if(!$('#txtSubject').val()) //Checks if Subject has been filled in
        {
            //Prints error message if Subject has not been filled in
            $('#txtSubject').next().text("*").css("color", "red");
            $('error').text("Error: Please fill out all required fields.");
        }
        else if(!$('#txtMessage').val()) //Checks if Message has been filled in
        {
            //Prints error message if Message has not been filled in
            $('#txtMessage').next().text("*").css("color", "red");
            $('error').text("Error: Please fill out all required fields.");
        }
	});
});