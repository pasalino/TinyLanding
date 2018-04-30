//For fixed header
function createSticky() {
    var sticky = $("#header");
    if (typeof sticky !== "undefined") {
        var pos = sticky.offset().top;
        if (pos > 0) sticky.addClass("sticky");
        var win = $(window);
        win.on("scroll", function () {
            if (win.scrollTop() > 0) {
                sticky.addClass("sticky");
            } else {
                sticky.removeClass("sticky");
            }
        });
    }
}

function menuButtonAnimation() {
    $('#nav-icon').on('click', function () {
        $("menu").toggleClass('open');
    });
    $("menu a").on('click', function (e) {
        $("menu").removeClass('open');
    });
}

function scrollOnLink() {
    $('header, .section_area, footer').waypoint({
        handler: function (direction) {
            var menu = $("menu");
            menu.find('li').removeClass('active');
            menu.find('a[href="#' + this.element.id + '"]').parent().addClass("active");
        },
        offset: 61
    });

    $("menu a, #link_logo").on('click', function (e) {
        e.preventDefault();
        var section = $(this).attr("href");
        var offset = 60;
        if ($(this).attr('id') === 'link_logo') {
            offset = 0;
        }
        $("html, body").animate({
            scrollTop: $(section).offset().top - offset
        });
    });
}

function sendMessage() {
    $('#send_lead').on('click', function (e) {
        e.preventDefault();
        var busy = false;
        var form = $("#lead");
        var token = form.find('#_csrf').val();
        var name = form.find('#name');
        var email = form.find('#email');
        var message = form.find('#message');

        form.find("input").removeClass("error");

        var data = {
            name: name.val(),
            surname: form.find('#surname').val(),
            email: email.val(),
            phone: form.find('#phone').val(),
            message: message.val(),
            company: form.find('#company').val(),
            product: form.find('#product').val(),
        };


        var error = false;

        if (!data.name) {
            name.addClass("error");
            error = true;
        }

        if (!data.email) {
            email.addClass("error");
            error = true;
        }

        if (!data.message) {
            message.addClass("error");
            error = true;
        }

        if (error) {
            return false;
        }

        busy = true;
        $.ajax({
            type: 'POST',
            url: '/leads',
            data: JSON.stringify(data),
            headers: {
                'CSRF-Token': token,
            },
            success: function (data) {
                busy = false;
                $("#lead").hide().animate({duration: 200});
                $("#thanks").show().animate({duration: 500});
            },
            error: function (data) {
                busy = false;
                $("#error_box").show().animate({duration: 200});
            },
            contentType: 'application/json',
            dataType: 'json'
        });

        return false;
    });
}


$(function () {
    createSticky();
    menuButtonAnimation();
    scrollOnLink();
    sendMessage();
});