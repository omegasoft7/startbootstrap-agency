$(function() {

    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $this = $("#sendMessageButton");
            $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
            postToGoogle(name, phone, email, message, firstName);
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

function postToGoogle(name, phone, email, message, firstName) {
    var origText = $('#original').val();
    var corText = $('#corect').val();
    var urlText = $('#url').val();
    $.ajax({
        url: "https://docs.google.com/forms/d/1wEhb3wxAsn11RksnesqytV94IVyVu3dqKbmDvXKqcRs/formResponse",
        data: {
            "entry.2005620554": name,
            "entry.1166974658": phone,
            "entry.1045781291": email,
            "entry.839337160": message
        },
        type: "POST",
        dataType: "xml",
        statusCode: {
            0: function() {
                //Success Message
                $('#success').html("<div class='alert alert-success'>");
                $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
                $('#success > .alert-success')
                    .append("<strong>Your message has been sent. </strong>");
                $('#success > .alert-success')
                    .append('</div>');
                //clear all fields
                $('#contactForm').trigger("reset");

                setTimeout(function() {
                    $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
                }, 1000);

            },
            200: function() {
                //Success Message
                $('#success').html("<div class='alert alert-success'>");
                $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
                $('#success > .alert-success')
                    .append("<strong>Your message has been sent. </strong>");
                $('#success > .alert-success')
                    .append('</div>');
                //clear all fields
                $('#contactForm').trigger("reset");

                setTimeout(function() {
                    $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
                }, 1000);
            }

            // //Fail message
            //     $('#success').html("<div class='alert alert-danger'>");
            //     $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            //         .append("</button>");
            //     $('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
            //     $('#success > .alert-danger').append('</div>');
            //     //clear all fields
            //     $('#contactForm').trigger("reset");

            //     setTimeout(function() {
            //         $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
            //     }, 1000);
        }
    });
}

$(document).ready(function() {
    $('#form').submit(function(e) {
        postToGoogle();
        e.preventDefault();
    });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});