/* Contact Form Script */
(function ($) {
    "use strict";
    var regForm = {
        initialized: false,
        initialize: function () {
            if (this.initialized)
                return;
            this.initialized = true;
            this.build();
            this.events();
        },
        build: function () {
            this.validations();
        },
        events: function () {
        },
        validations: function () {
            var regform = $(".register-form"),
                    url = regform.attr("action");
            regform.validate({
                submitHandler: function (form) {
                    // Loading State
                    var submitButton = $(this.submitButton);
                    submitButton.button("جاري");

                    // Ajax Submit
                    $.ajax({
                        method: "POST",
                        url: url,
                        data: $(form).serialize(),
                        dataType: "json",
                        success: function (data) {
                            if (data.response == "success") {
                                var message = data.message;
                                $("#reg-alert-success").text(message);
                                $("#reg-alert-success").stop().removeClass("hidden").hide().fadeIn();
                                $("#reg-alert-error").stop().addClass("hidden");
                                // Reset Form
                                $("#reg-form .form-control")
                                        .val("")
                                        .blur()
                                        .parent()
                                        .removeClass("has-success")
                                        .removeClass("has-error")
                                        .find("label.error")
                                        .remove();
                                if (($("#reg-alert-success").position().top - 80) < $(window).scrollTop()) {
                                    $("html, body").animate({
                                        scrollTop: $(".reg-alert-success").offset().top - 80
                                    }, 300);
                                }
                                if (data.response === "success") {
                                    location.reload();
                                }
                            } else if (data.response == 'error') {
                                var message = data.message;
                                $("#reg-alert-error").text(message);
                                $("#reg-alert-error").stop().removeClass("hidden").hide().fadeIn();
                                $("#reg-alert-success").stop().addClass("hidden");
                                setTimeout(function () {
                                    $("#reg-alert-error").stop().fadeOut().addClass("hidden");
                                    footHeight();
                                    $("html, body").animate({
                                        scrollTop: $(document).height()
                                    }, 300);
                                }, 3000);
                            }
                            footHeight();
                            $("html, body").animate({
                                scrollTop: $(document).height()
                            });
                        },
                        complete: function () {
                            submitButton.button("reset");
                            footHeight();
                            $("html, body").animate({
                                scrollTop: $(document).height()
                            }, 300);
                        }
                    });
                },
                rules: {
                    name: {
                        required: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    f_name: {
                        required: true
                    },
                    g_name: {
                        required: true
                    },
                    job: {
                        required: true
                    },
                    nationalID: {
                        required: true,
                        minlength: 10
                    },
                    password: {
                        required: true,
                        minlength: 6
                    },
                    rpassword: {
                        equalTo: "#reg_pass",
                        required: true,
                        minlength: 6
                    },
                    gender: {
                        required: true
                    },
                    b_date: {
                        required: true
                    },
                    total: {
                        required: true
                    },
                    speciality: {
                        required: true
                    },
                    faculty: {
                        required: true
                    },
                    degree: {
                        required: true
                    },
                    mobile: {
                        required: true
                    },
                    e_name: {
                        required: true
                    },
                    e_fname: {
                        required: true
                    },
                    e_gname: {
                        required: true
                    },
                    family: {
                        required: true
                    },
                    f_family: {
                        required: true
                    }
                },
                messages: {
                    gender: {
                        required: 'برجاء ادخال الجنس'
                    }
                    , b_date: {
                        required: 'برجاء ادخال تاريخ الميلاد'
                    }
                    , total: {
                        required: 'برجاء ادخال المعدل التراكمي'
                    }
                    , speciality: {
                        required: 'برجاء ادخال التخصص'
                    }
                    , faculty: {
                        required: 'برجاء ادخال الكليه'
                    }
                    , degree: {
                        required: 'برجاء ادخال الدرجه'
                    }
                    , mobile: {
                        required: 'برجاء ادخال رقم الهاتف'
                    }
                    , e_name: {
                        required: 'برجاء ادخال الاسم باللغه النجليزيه'
                    }
                    , name: {
                        required: 'برجاء ادخال الاسم الاول'
                    },
                    e_fname: {
                        required: 'برجاء ادخال اسم الاب باللغه الانجليزيه'
                    }
                    , f_name: {
                        required: 'برجاء ادخال اسم الاب'
                    },
                    e_gname: {
                        required: 'برجاء ادخال اسم الجد باللغه الانجليزيه'
                    }
                    , g_name: {
                        required: 'برجاء ادخال اسم الجد'
                    },
                    family: {
                        required: 'برجاء ادخال اسم العائله'
                    }
                    , f_family: {
                        required: 'برجاء ادخال اسم العائله بالانجليزيه'
                    }
                    , job: {
                        required: 'برجاء ادخال الوظيفه الحاليه'
                    },
                    nationalID: {
                        required: 'برجاء ادخال الرقم القومي',
                        minlength: 'الرقم القومي لا يقل عن 10 رقم'
                    },
                    email: {
                        required: 'برجاء ادخال البريد الالكتروني'
                    },
                    password: {
                        required: 'برجاء ادخال السري',
                        minlength: 'يجب الا يقل الرقم السري عن 6 حروف'
                    },
                    rpassword: {
                        required: 'برجاء اعاده ادخال السري',
                        minlength: 'يجب الا يقل الرقم السري عن 6 حروف',
                        equalTo: 'الرقم السري غير متوافق '
                    }
                },
                highlight: function (element) {
                    $(element)
                            .parent()
                            .removeClass("has-success")
                            .addClass("has-error");
                    if (typeof $.fn.isotope !== 'undefined') {
                        $('.filter-elements').isotope('layout');
                    }
                },
                success: function (element) {
                    $(element)
                            .parent()
                            .removeClass("has-error")
                            .addClass("has-success")
                            .find("label.error")
                            .remove();
                }
            });
            $.ajaxSetup(
                    {
                        headers:
                                {
                                    'X-CSRF-Token': $('input[name="_token"]').val()
                                }
                    });
        }
    };
    regForm.initialize();

    /* Login form
     ================*/
    var headLoginForm = {
        initialized: false,
        initialize: function () {
            if (this.initialized)
                return;
            this.initialized = true;
            this.build();
            this.events();
        },
        build: function () {
            this.validations();
        },
        events: function () {
        },
        validations: function () {
            var headLoginForm = $(".login-form"),
                    url = headLoginForm.attr("action");
            headLoginForm.validate({
                submitHandler: function (form) {
                    // Loading State
                    var submitButton = $(this.submitButton);

                    submitButton.button("جاري");

                    // Ajax Submit
                    $.ajax({
                        method: "POST",
                        url: url,
                        data: $(form).serialize(),
                        dataType: "json",
                        success: function (data) {
                            if (data.response === "success") {
                                var alertSelector = '#headLogActionSuccess';
                                var alertOpSelector = '#headLogActionError';
                            } else if (data.response === "error") {
                                var alertSelector = '#headLogActionError';
                                var alertOpSelector = '#headLogActionSuccess';
                            }
                            $(alertSelector).text(data.message);
                            $(alertSelector).hide().removeClass('hidden').fadeIn();
                            setTimeout(function () {
                                $(alertSelector).fadeOut().addClass('hidden');
                            }, 3000);
                            $(alertOpSelector).fadeOut().addClass('hidden');
                            if (data.response === "success") {
                                location.reload();
                            }
                        },
                        complete: function () {
                            submitButton.button("reset");
                        }
                    });
                },
                rules: {
                    nationalID: {
                        required: true
                    },
                    password: {
                        required: true
                    }
                },
                messages: {
                    nationalID: {
                        required: 'برجاء ادخال الرقم القومي'
                    },
                    password: {
                        required: 'برجاء ادخال الرقم السري'
                    }
                },
                highlight: function (element) {
                    $(element)
                            .parent()
                            .removeClass("has-success")
                            .addClass("has-error");
                    if (typeof $.fn.isotope !== 'undefined') {
                        $('.filter-elements').isotope('layout');
                    }
                },
                success: function (element) {
                    $(element)
                            .parent()
                            .removeClass("has-error")
                            .addClass("has-success")
                            .find("label.error")
                            .remove();
                }
            });
            $.ajaxSetup(
                    {
                        headers:
                                {
                                    'X-CSRF-Token': $('input[name="_token"]').val()
                                }
                    });
        }
    };
    headLoginForm.initialize();
})(jQuery);