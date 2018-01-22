/*Created by Tim Garvin
Copyright © 2017 Tim Garvin

This jQuery script is intended for use by Tim Garvin only, but anyone is welcome to view the code.

Description: SoundCloud Tracks Loader is a tool that loads tracks from SoundCloud profiles. This tool is 
especially useful with SoundCloud profiles containing many tracks that would crash your browser if you tried
loading them all on soundcloud.com . This jQuery script loads SoundCloud tracks by using the SoundCloud API after
being provided the SoundCloud Profile URL input from the user.*/

//Initializes SoundCloud API Connection
SC.initialize({
	client_id: 'F29r79Ki1klvm40F0vgJN6Ue0wnzPRTv'
});

//Gets track information from the entered SoundCloud profile
var getTracks = function (profile_info)
{
    //Gets tracks from the entered SoundCloud profile
	SC.get('/users/' + profile_info.id + '/tracks', { limit: 200 }).then( function (tracks)
	{
        if(tracks.length > 0) //If more than one track is found from the SoundCloud profile URL
        {
            $('#results').empty(); //Clear the select box
        }
        else //When no tracks were found from the SoundCloud profile URL (Error)
        {
            $('#error-symbol').text("*"); //Displays the error symbol
            $('#error').text("Error: The profile entered has no tracks or does not allow tracks to be loaded."); //Displays an error message
        }

        //Loops through all of the tracks in the results
        tracks.forEach(function(track) {
            //Adds current track's values: URL, artwork URL, downloadable status and its display text: the track's title, to the tracks list in the select box
            $('#results').append($('<option></option>', {value: track.permalink_url + ' - ' + track.artwork_url + ' - ' + track.downloadable, text: track.title}));
        });

        $('#results option:first-child').attr("selected", "selected"); //Selects the first option in the select box

        var value = $("#results option:selected").val(); //Gets the value of the currently selected option in the select box
        var urls = value.split(" - "); //Splits the permalink_url and artwork_url
        var source_url = "https://w.soundcloud.com/player/?url=" + urls[0]; //Sets the track source_url for the player

        $("#soundcloud-player").attr('src', source_url); //Loads the track into the player

        var image_url = urls[1]; //Sets the image_url from the split string array

        $(".track_cover").attr('src', image_url.replace("large", "t500x500")); //Loads the thumbnail picture								
        $(".original_cover").attr('href', image_url.replace("large", "original")); //Sets the original image URL
	});
}

//Loads objects when the page is ready
$(document).ready(function() {
    var url = 'https://soundcloud.com/housemusic' //Sets the default profile to load tracks from on page load
	
	//Gets track information from the entered SoundCloud profile
	//Displays an error message if an error occurs
	SC.resolve(url).then(getTracks).catch(function(error)
    {
        if(error.message == "404 - Not Found") //If Error message received is "404 - Not Found"
        {
            $('#error-symbol').text("*"); //Displays the error symbol
            $('#error').text("Error: " + "The entered artist's profile cannot be found"); //Displays error message
        }
        else //When any other Error message is received
        {
            $('#error-symbol').text("*"); //Displays the error symbol
            $('#error').text("Error: " + error.message); //Displays error message
        }
	});
	
	//Loads tracks from a different SoundCloud artist's profile when the Submit button is clicked
	$("#btnSubmit").click( function() {
        if($('#txtURL').val()) //Checks if URL textbox has a value before loading SoundCloud profile tracks
        {
			//Resets error messages and symbols
            $('#error-symbol').text("");
            $('#error').text("");
            
            var url = $("#txtURL").val(); //Grabs the new artist URL from the input text box

			//Sets http/https prefix variables for artwork URL
			var	http_prefix = "http://";
			var	https_prefix = "https://";

			//Sets http/https variables based on which exists (if match found: store found string, else: store NULL)
			var http_exists = url.match(new RegExp(http_prefix));
			var https_exists = url.match(new RegExp(https_prefix));

			if ((!http_exists) && (!https_exists)) //If http/https prefix does not exist
			{
				url = https_prefix.concat(url); //Adds https:// prefix to the SoundCloud URL
			}
			
			//Gets track information from the entered SoundCloud profile
			//Displays an error message if an error occurs
            SC.resolve(url).then(getTracks).catch( function(error)
            {
                if(error.message == "404 - Not Found") //If Error message received is "404 - Not Found"
                {
                    $('#error-symbol').text("*"); //Displays the error symbol
                    $('#error').text("Error: The profile entered cannot be found or does not exist."); //Displays error message
                }
                else //When any other Error message is received
                {
                    $('#error-symbol').text("*"); //Displays the error symbol
                    $('#error').text("Error: " + error.message); //Displays error message
                }
            });
        }
        else //When a value has not been entered into the URL textbox
        {
            $('#error-symbol').text("*"); //Displays the error symbol
            $('#error').text("Error: Please enter a SoundCloud Profile Address."); //Displays error message
        }
	});
    
	//Loads tracks from a different artist's profile when the Enter button is pressed in the text box
    $('#txtURL').keypress(function(event) {        
        if (event.which == 13) //If Enter key is pressed
        {            
            if($('#txtURL').val()) //Checks if URL textbox has a value before loading SoundCloud tracks
            {
				//Resets error messages and symbols
                $('#error-symbol').text("");
                $('#error').text("");

                var url = $('#txtURL').val(); //Grabs the new artist URL from the input text box

				//Sets http/https prefix variables for artwork URL
				var	http_prefix = "http://";
				var	https_prefix = "https://";

				//Sets http/https variables based on which exists (if match found: store found string, else: store NULL)
				var http_exists = url.match(new RegExp(http_prefix));
				var https_exists = url.match(new RegExp(https_prefix));

				if ((!http_exists) && (!https_exists)) //If http/https prefix does not exist
				{
					url = https_prefix.concat(url); //Adds https:// prefix to the SoundCloud URL
				}
				
				//Gets track information from the entered SoundCloud profile
				//Displays an error message if an error occurs
                SC.resolve(url).then(getTracks).catch(function (error)
				{
                    if(error.message == "404 - Not Found") //If Error message received is "404 - Not Found"
                    {
                        $('#error-symbol').text("*"); //Displays the error symbol
                        $('#error').text("Error: " + "The profile entered cannot be found or does not exist."); //Displays error message
                    }
                    else //When any other Error message is received
                    {
                        $('#error-symbol').text("*"); //Displays the error symbol
                        $('#error').text("Error: " + error.message); //Displays error message
                    }
                });
            }
            else //When a value has not been entered into the URL textbox
            {
                $('#error-symbol').text("*"); //Displays the error symbol
                $('#error').text("Error: Please enter a SoundCloud Profile Address."); //Displays error message
            }
        }
    });
	
	//Loads the newly selected track into the player and thumbnail image
	$('#results').change( function() {
		var value = $("#results option:selected").val(); //Gets the currently selected track's value
		var urls = value.split(" - "); //Splits the permalink_url and artwork_url
		var source_url = "https://w.soundcloud.com/player/?url=" + urls[0]; //Sets the track source_url for the player
		
		$('#soundcloud-player').attr('src', source_url); //Loads the track into the player
	});
});