$(function () {
    $('#send_lead').on('click', function () {
        let token = $('#_csrf').val();

        let data = {
            name: $('#name').val(),
            surname: $('#surname').val(),
            email: $('#email').val(),
            phone: $('#phone').val(),
            message: $('#message').val(),
            company: $('#company').val(),
            product: $('#product').val(),
        };

        $.ajax({
            type: 'POST',
            url: '/leads',
            data: JSON.stringify(data),
            headers: {
                'CSRF-Token': token,
            },
            success: function (data) {
                alert('data: ' + data);
            },
            contentType: 'application/json',
            dataType: 'json'
        });
    });
});