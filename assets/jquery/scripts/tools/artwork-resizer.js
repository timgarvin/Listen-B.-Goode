/*Created by Tim Garvin
Copyright © 2017 Tim Garvin

This jQuery script is intended for use by Tim Garvin only, but anyone is welcome to view the code.

Description: Artwork Resizer is a tool that allows music archivists and fans alike to load artwork in a preferred
size that may not otherwise be found when simply browsing SoundCloud or Bandcamp alone. This tool does not 
actually resize the image itself, but edits SoundCloud and Bandcamp image URLs in such a way that has SoundCloud 
and Bandcamp load the new sizes for us. This is an important feature of this tool because this keeps the newly 
loaded artwork size official for music archiving. This is especially useful for music archiving when loading 
larger image sizes that may not be found otherwise. Larger image sizes are recommended over smaller image sizes
for music release archiving, because an image will always look better reduced in size than stretched to a bigger
size (causes pixelation).*/

//Checks the type of site requested
function get_site_type(url)
{
	//Declares and initializes variables for determining the url type entered
    //Initializes variables by searching through url string (if match: returns value found, if no match: returns NULL)
    var soundcloud = url.match(/sndcdn/);
    var bandcamp = url.match(/bcbits/);
    var bandcamp2 = url.match(/bandcamp/);
    
    //Declares and initializes the type variable to return from this function later
    var type = "";
    
    //Checks which url type has been entered and sets the type accordingly
    if(soundcloud) //If SoundCloud url type found
    {
       type = "soundcloud"; //Sets site type to SoundCloud
    }
    else if((bandcamp) || (bandcamp2)) //If Bandcamp url type found
    {
        type = "bandcamp"; //Sets site type to Bandcamp
    }
    else //When no valid site type has been found
    {
        type = "none"; //Sets site type to none
    }
    
    return type; //Returns the url type
}

//Loads objects when the page is ready
$(document).ready(function() {
    var artwork_url = $("#artwork img").attr("src"); //Sets the artwork_url variable to the current src of the default loaded artwork image
    
    var site_type = get_site_type(artwork_url); //Sets the site_type variable to the current site's type
    
    //Shows or hides drop-down lists based on default image URL entered
    if(site_type == "soundcloud") //If SoundCloud image type found
    {
        $('#bandcamp-image-sizes').hide(); //Hides Bandcamp drop-down list
        $('#soundcloud-image-sizes').show(); //Shows SoundCloud drop-down list
    }
    else if(site_type == "bandcamp") //If Bandcamp image type found
    {
        $('#soundcloud-image-sizes').hide(); //Hides SoundCloud drop-down list
        $('#bandcamp-image-sizes').show(); //Shows Bandcamp drop-down list
    }
    else //When no required site type is found
    {
        $('#soundcloud-image-sizes').hide(); //Hides SoundCloud drop-down list
        $('#bandcamp-image-sizes').hide(); //Hides Bandcamp drop-down list
    }
	
	//Loads artwork when the Load Artwork button is clicked
	$("#btnArtwork").click( function() {
        if($('#txtURL').val()) //Checks if URL textbox has a value before loading artwork
        {
            //Resets error messages
            $('#address-error').text("");
            $('#new-size-error').text("");
            
            //Resets error symbols (*)
            $('#address-error-symbol').text("");
            $('#bandcamp-error-symbol').text("");
            $('#soundcloud-error-symbol').text("");
            
            artwork_url = $("#txtURL").val(); //Grabs the new image URL from the input text box

            var site_type = get_site_type(artwork_url); //Sets the site_type variable to the current site's type

            //Loads new artwork image based on image URL type entered
            if(site_type == "soundcloud") //If SoundCloud image type found
            {
                $('#bandcamp-image-sizes').hide(); //Hides Bandcamp drop-down list
                $('#soundcloud-image-sizes').show(); //Shows SoundCloud drop-down list
                
                //Sets http/https prefix variables for artwork URL
                var	http_prefix = "http://";
                var	https_prefix = "https://";

                //Sets http/https variables based on which exists (if match found: store found string, else: store NULL)
                var http_exists = artwork_url.match(new RegExp(http_prefix));
                var https_exists = artwork_url.match(new RegExp(https_prefix));

                if ((http_exists) || (https_exists)) //Checks if http/https prefix exists
                {
                    $("#artwork img").attr('src', artwork_url); //Loads the new artwork using the current artwork_url variable
                }
                else //When an http/https prefix does not exist in the image URL
                {
                    $("#artwork img").attr('src', http_prefix.concat(artwork_url)); //Loads the new artwork using the artwork_url variable concatenated with the http:// prefix
                }
            }
            else if(site_type == "bandcamp") //If Bandcamp image type found
            {
                $('#soundcloud-image-sizes').hide(); //Hides SoundCloud drop-down list
                $('#bandcamp-image-sizes').show(); //Shows Bandcamp drop-down list
                
                //Sets http/https prefix variables for artwork URL
                var	http_prefix = "http://";
                var	https_prefix = "https://";

                //Sets http/https variables based on which exists (if match found: store found string, else: store NULL)
                var http_exists = artwork_url.match(new RegExp(http_prefix));
                var https_exists = artwork_url.match(new RegExp(https_prefix));

                if ((http_exists) || (https_exists)) //Checks if http/https prefix exists
                {
                    $("#artwork img").attr('src', artwork_url); //Loads the new artwork using the current artwork_url variable
                }
                else //When an http/https prefix does not exist in the image URL
                {
                    $("#artwork img").attr('src', http_prefix.concat(artwork_url)); //Loads the new artwork using the artwork_url variable concatenated with the http:// prefix
                }
            }
            else //When neither SoundCloud nor Bandcamp image types are found (Error)
            {
                $('#address-error-symbol').text("*"); //Displays asterisk (*) symbol to indicate an error has occurred
                $('#address-error').text("Error: You have entered an invalid Image Address. Please enter an Image Address from SoundCloud or Bandcamp."); //Displays Error message
            }
        }
        else //When the image URL textbox does not contain an image URL (Error)
        {
            $('#address-error-symbol').text("*"); //Displays asterisk (*) symbol to indicate an error has occurred
            $('#address-error').text("Error: You have not entered an Image Address."); //Displays Error message
        }
	});
    
    //Loads artwork when the Load Artwork button is clicked
    $('#txtURL').keypress(function(event) {
        if (event.which == 13) //If Enter key is pressed
        {
            if($('#txtURL').val()) //Checks if URL textbox has a value before loading artwork
            {
                //Resets error messages
                $('#address-error-symbol').text("");
                $('#address-error').text("");
                $('#new-size-error').text("");

                //Resets error symbols (*)
                $('#bandcamp-error-symbol').text("");
                $('#soundcloud-error-symbol').text("");
                
                artwork_url = $("#txtURL").val(); //Grabs the new image URL from the input text box

                var site_type = get_site_type(artwork_url); //Sets the site_type variable to the current site's type
                
                if(site_type == "soundcloud") //If SoundCloud image type found
                {
                    $('#bandcamp-image-sizes').hide(); //Hides Bandcamp drop-down list
                    $('#soundcloud-image-sizes').show(); //Shows Bandcamp drop-down list

                    //Sets http/https prefix variables for artwork URL
                    var	http_prefix = "http://";
                    var	https_prefix = "https://";

                    //Sets http/https prefix variables for artwork URL
                    var http_exists = artwork_url.match(new RegExp(http_prefix));
                    var https_exists = artwork_url.match(new RegExp(https_prefix));

                    if ((http_exists) || (https_exists)) //Checks if http/https prefix exists
                    {
                        $("#artwork img").attr('src', artwork_url); //Loads the new artwork using the current artwork_url variable
                    }
                    else //When an http/https prefix does not exist in the image URL
                    {
                        $("#artwork img").attr('src', http_prefix.concat(artwork_url)); //Loads the new artwork using the artwork_url variable concatenated with the http:// prefix
                    }
                }
                else if(site_type == "bandcamp") //If Bandcamp image type found
                {
                    $('#soundcloud-image-sizes').hide(); //Hides SoundCloud drop-down list
                    $('#bandcamp-image-sizes').show(); //Shows Bandcamp drop-down list

                    //Sets http/https prefix variables for artwork URL
                    var	http_prefix = "http://";
                    var	https_prefix = "https://";

                    //Sets http/https variables based on which exists (if match found: store found string, else: store NULL)
                    var http_exists = artwork_url.match(new RegExp(http_prefix));
                    var https_exists = artwork_url.match(new RegExp(https_prefix));

                    if ((http_exists) || (https_exists)) //Checks if http/https prefix exists
                    {
                        $("#artwork img").attr('src', artwork_url); //Loads the new artwork using the current artwork_url variable
                    }
                    else //When an http/https prefix does not exist in the image URL
                    {
                        $("#artwork img").attr('src', http_prefix.concat(artwork_url)); //Loads the new artwork using the artwork_url variable concatenated with the http:// prefix
                    }
                }
                else //When neither SoundCloud nor Bandcamp image types are found (Error)
                {
                    $('#address-error-symbol').text("*"); //Displays asterisk (*) symbol to indicate an error has occurred
                    $('#address-error').text("Error: You have entered an invalid Image Address. Please enter an Image Address from SoundCloud or Bandcamp."); //Displays Error message
                }
            }
            else //When the image URL textbox does not contain an image URL (Error)
            {
                $('#address-error-symbol').text("*"); //Displays asterisk (*) symbol to indicate an error has occurred
                $('#address-error').text("Error: You have not entered an Image Address."); //Displays Error message
            }
        }
    });
    
    //Loads resized artwork image in a new tab when the Load New Size button is clicked
	$("#btnNewSize").click( function() {
        if(($('#bandcamp-image-sizes').val()) || ($('#soundcloud-image-sizes').val())) //Checks if a new image size selection has been made
        {
            //Resets error messages
            $('#address-error-symbol').text("");
            $('#bandcamp-error-symbol').text("");
            $('#soundcloud-error-symbol').text("");
            
            //Resets error symbols (*)
            $('#address-error').text("");
            $('#new-size-error').text("");
            
            artwork_url = $("#artwork img").attr("src"); //Grabs the new image URL from the input text box

            
            var site_type = get_site_type(artwork_url); //Sets the site_type variable to the current site's type

            //Loads resized artwork image based on image URL type
            if(site_type == "soundcloud") //If the image url entered is a SoundCloud image
            {
                var split_url = artwork_url.split("/"); //Splits the image URL based on the forward slash (/) character

                var old_filename = split_url[split_url.length-1]; //Sets the old filename based on the split image url

                if(!old_filename) //Checks if old_filename = NULL (when a final / character was entered in the URL)
                {
                    old_filename = split_url[split_url.length-2]; //Sets the old filename based on the split image url when a / character has been entered in the image URL
                }

                var split_filename = old_filename.split("-"); //Splits the old filename based on the hypen (-) character
                
                var new_filename = split_filename[0].concat('-', split_filename[1], '-', split_filename[2], '-', $("#soundcloud-image-sizes").val(), ".jpg"); //Creates a new filename based on the split filename and the size selected in the New Size drop-down list
                
                var new_artwork_url = artwork_url.replace(old_filename, new_filename); //Finds the old_filename in the original image URL and replaces it with the new filename

                window.open(new_artwork_url); //Loads the new resized image in a new tab
            }
            else if(site_type == "bandcamp") //If the image url entered is a Bandcamp image
            {
                var split_url = artwork_url.split("/"); //Splits the image URL based on the forward slash (/) character
                
                var old_filename = split_url[split_url.length-1]; //Sets the old filename based on the split image url

                if(!old_filename) //Checks if old_filename = NULL (when a final / character was entered in the URL)
                {
                    old_filename = split_url[split_url.length-2]; //Sets the old filename based on the split image url when a / character has been entered in the image URL
                }

                var split_filename = old_filename.split("_"); //Splits the old filename based on the underscore (_) character
                
                var extension = ".jpg"; //Sets the filename extension to .jpg

                if ($("#bandcamp-image-sizes").val() == 31) //If the preferred image size selected is 31 (1024x1024 - PNG version instead of JPG)
                {
                    extension = ".png"; //Sets the filename extension to .png
                }

                var new_filename = split_filename[0].concat('_', $("#bandcamp-image-sizes").val(), extension); //Creates the new filename by taking the first value in the split filename and concatenating it with the underscore (_) character, the selected new image size, and the image extension

                var new_artwork_url = artwork_url.replace(old_filename, new_filename); //Finds the old_filename in the original image URL and replaces it with the new filename

                window.open(new_artwork_url); //Loads the new resized image in a new tab
            }
        }
        else //When a new image size selection has not been made
        {
            if($('#bandcamp-image-sizes').is(":visible")) //If the Bandcamp drop-down list is visible
            {
                $('#bandcamp-error-symbol').text("*"); //Display the error symbol (*) for the Bandcamp drop-down list
            }
            else //If the SoundCloud drop-down list is visible
            {
                $('#soundcloud-error-symbol').text("*"); //Display the error symbol (*) for the SoundCloud drop-down list
            }
            
            $('#new-size-error').text("Error: Please select a new size."); //Displays an error message
        }
	});
});