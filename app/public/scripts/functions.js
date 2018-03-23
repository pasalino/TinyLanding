$(document).ready(function () {
    $("#send").click(function (evt) {
        var a = $("#name").val();
        var token = $("#_csrf").val();
        $.ajax({
            type: "POST",
            url: "/sendmail",
            data: JSON.stringify({name: a}),
            headers: {
                'CSRF-Token': token
            },
            success: function (data) {
                alert('data: ' + data);
            },
            contentType: "application/json",
            dataType: 'json'
        });
    });
});