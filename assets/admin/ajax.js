(function () {
//console.log('ajax');
    /***************************************************************************
     * AJAX Setup for processing
     ***************************************************************************/
    //var baseUrl = '/tourism';
    var csrf = new FormData($('#csrf')[0]);
    var loading = $('#loading').html();

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
        }
    });

// --------------------------Trigger File upload browsing Section ---------------------------
    $(document).on('click', '.btn-product-image', function () {
        var btn = $(this);
        var uploadInp = btn.next('input[type=file]');
        uploadInp.change(function () {
            if (validateImgFile(this)) {
                btn.html('');
                previewURL(btn, this);
            }
        }).click();
    });

    function previewURL(btn, input) {
        if (input.files && input.files[0]) {
            // collecting the file source
            var file = input.files[0];
            // preview the image
            var reader = new FileReader();
            reader.onload = function (e) {
                var src = e.target.result;
                btn.attr('src', src);
            };
            reader.readAsDataURL(file);
        }
    }
    //validating the file
    function validateImgFile(input) {
        if (input.files && input.files[0]) {
            // collecting the file source
            var file = input.files[0];
            // validating the image name
            if (file.name.length < 1) {
                alert("The file name couldn't be empty");
                return false;
            }
            // validating the image size
            else if (file.size > 2000000) {
                alert("The file is too big");
                return false;
            }
            // validating the image type
            else if (file.type != 'image/png' && file.type != 'image/jpg' && file.type != 'image/gif' && file.type != 'image/jpeg') {
                alert("The file does not match png, jpg or gif");
                return false;
            }
            return true;
        }
    }

    /***************************************************************************
     * Modal View Modal
     **************************************************************************/

    $(document).on('click', '.btn-modal-view', function () {
        var $this = $(this);
        var url = $this.data('url');
        var data_lang = "lang=" + $this.data('lang');
        if ($this.find('.tiny-editor').length) {
            for (var i = 0; i < tinymce.editors.length; i++) {
                formData.append('editor' + (i + 1), tinymce.editors[i].getContent());
            }
        }

        var originalHtml = $this.html();
        //$this.prop('disabled', true).html('loading...');
        request(url, data_lang, function (data) {
            $this.prop('disabled', false).html(originalHtml);
            $('#common-modal').html(data).modal('toggle');
        }, function () {
            alert('Error');
        }, 'get');
    });
    /***************************************************************************
     * Common Translate Section
     ***************************************************************************/
    //get the master id and the new language parameters
    //add the new data with new language with the same master id
    var selectLang = $('.select-lang');
    var transBtn = $('.trans-btn');
    var hiddenId = $("#hidden_id");
    var hiddenLang = $("#hidden_lang");

    selectLang.on('change', function () {
        var lang = $(this).find('option:selected').val();
        transBtn.attr('data-lang', lang);
        hiddenId.val(transBtn.attr('data-id'));
        $('.data_lang_id').val(lang);
        hiddenLang.val(lang);
        console.log(lang);

    });

    //////////////////////////////////
    /***************************************************************************
     * Custom logging function
     * @param mixed data
     * @returns void
     **************************************************************************/
    function _(data) {
        console.log(data);
    }

    var AddModalBtn = $('.addBTN');
    // var modelName = $('.add').attr('href');
    AddModalBtn.on('click', function () {
        var AddModalForm = $(this).closest('form');
        var formData = new FormData(AddModalForm[0]);

        if (typeof tinymce !== "undefined" && tinymce.editors.length) {
            for (var i = 0; i < tinymce.editors.length; i++) {
                formData.append('desc' + (i + 1), tinymce.editors[i].getContent());
            }
        }
        request(AddModalForm.attr('action'), formData,
                // on request success handler
                        function (result) {
                            if (result.status) {
                                swal({title: "نجاح", text: result.data, type: "success"}, function () {
                                    location.reload(true);
                                });
                            } else {
                                swal('خطا', result.data, 'error');
                            }
                        },
                        // on request failure handler
                                function () {
                                    alert('Internal Server Error.');
                                });
                    });
            //////////////////// for send subscribtion messege //////////////////////////////
            $(document).on("submit", ".new-form", function (e) {
                e.preventDefault();
                // var $this = $(this);
                //  $(this).data(loading);
                // $("#loadmodel").show();

                var url = $(this).attr('action');
                var ajaxSubmit = $(this).find('.new-submit');
                var ajaxSubmitHtml = ajaxSubmit.html();
                var altText = loading;
                var notification = 'm';
                if (ajaxSubmit.data('loading') !== undefined) {
                    altText = ajaxSubmit.data('loading');
                }
                //ajaxSubmit.prop('disabled', true).html(altText);
                var formData = new FormData(this);
                if ($(this).find('.tiny-editor').length) {
                    for (var i = 0; i < tinymce.editors.length; i++) {
                        formData.append('editor' + (i + 1), tinymce.editors[i].getContent());
                    }
                }
                if ($(this).data('url') !== undefined) {
                    url = $(this).data('url');
                }
                if ($(this).data('notification') !== undefined) {
                    notification = $(this).data('notification');
                }

                request(url, formData, function (result) {
                    // altText.show();
                    if (result.status) {
                        $("#loadmodel").hide();
                        swal({title: "success.", text: result.data, type: "success"}, function () {
                            location.reload(true);
                        });
                    } else {
                        $("#loadmodel").hide();

                        swal('wrong.', result.data, 'error');
                    }
                });
            });

            ///////////////////////////////////////////////////////////////////////
            var TransModalBtn = $('.transBTN');
            //            var modelName = $('.trans').attr('href');
            TransModalBtn.on('click', function () {
                var TransModalForm = $(this).closest('form');
                //                var formData = new FormData(AddModalForm[0]);
                request(TransModalForm.attr('action'), new FormData(TransModalForm[0]),
                        // on request success handler
                                function (result) {
                                    if (result.status) {
                                        swal({title: "success", text: result.data, type: "success"}, function () {
                                            location.reload(true);
                                        });
                                    } else {
                                        swal('wrong', result.data, 'error');
                                    }
                                },
                                // on request failure handler
                                        function () {
                                            alert('Internal Server Error.');
                                        });
                            });


                    $('.btndelet').click(function (e) {

                        var txt = $('#template-modal').html();
                        var url = $(this).attr('data-url');
                        txt = txt.replace(new RegExp('{url}', 'g'), url);
                        $('#delete-modal .modal-dialog').html(txt);
                        $('#delete-modal').modal('show');
                        e.preventDefault()
                    });

                    /***************************************************************************
                     * Search input events for filtered table
                     **************************************************************************/
                    var tableData = $('#ajax-table');
                    $(document).on('click', '#ajax-table .pagination a', function (e) {
                        var $this = $(this);
                        tableData.html(loading);
                        $.ajax({
                            url: $this.attr('href'),
                        }).done(function (data) {
                            tableData.html(data);
                        }).fail(function () {
                            alert('Internal Server Error.');
                        });
                        e.preventDefault();
                    });
                    var inputSearch = $('#input-search');
                    $(document).on('click', '.btn-search', function () {
                        var form = $(this).closest('form');
                        var search = (inputSearch.val().length) ? "/" + inputSearch.val() : "";
                        tableData.html(loading);
                        request(form.attr('action') + "/search" + search, null, function (data) {
                            tableData.html(data);
                        }, function () {
                            alert('Internal Server Error');
                        }, 'get');
                    });
                    /**************************************************************************
                     * Actions Of Filters Buttons
                     ***************************************************************************/

                    $(document).on('change', '.btn-filter', function () {
                        var $this = $(this);
                        var filter = $this.data('filter');
                        tableData.html(loading);
                        var form = $this.closest('form');
                        request(form.attr('action') + "/filter/" + filter, null, function (data) {
                            tableData.html(data);
                        }, function () {
                            alert('Internal Server Error.');
                        }, 'get');
                    });
                    /**************************************************************************
                     * Events Action Buttons for the tables
                     **************************************************************************/

                    $(document).on('click', '.btn-action', function (e) {
                        var $this = $(this);
                        var action = $this.data('action');
                        var form = $this.closest('form');
                        request(form.attr('action') + "/action/" + action, new FormData(form[0]), function (data) {
                            if (data.status === 'success') {
                                notify(data.status, data.title, data.msg, function () {
                                    $('input[data-filter=all]').change();
                                });
                            } else {
                                notify(data.status, data.title, data.msg);
                            }
                        }, function () {
                            alert('Internal Server Error.');
                        });
                        e.preventDefault();
                    });

                    /***************************************************************************
                     * Check ALL Button For Table Rows
                     ***************************************************************************/

                    $(document).on('click', '#chk-all', function () {
                        $('.chk-box').prop('checked', this.checked);
                    });

                    /***********************************************************************
                     * loading new file image 
                     **********************************************************************/

                    $(document).on('click', '.file-generate', function () {
                        var $this = $(this);
                        var fileBox = $this.closest('.file-box');
                        var newBox = $('div.file-box:first').clone();
                        newBox.find('img').prop('src', 'https://placeholdit.imgix.net/~text?txtsize=33&txt=290%C3%97180%20or%20larger&w=290&h=180');
                        newBox.find('.caption').append('<button type="button" class="file-remove btn btn-danger"><i class="fa fa-minus" aria-hidden="true"></i></button>');
                        fileBox.after(newBox);

                    });

                    $(document).on('click', '.file-remove', function () {
                        var $this = $(this);
                        $this.closest('.file-box').remove();
                    });


                    $(document).on('click', '.file-btn', function () {
                        $(this).closest('.file-box').find('input[type=file]').click();
                    });
                    $(document).on('change', '.file-box input[type=file]', function () {
                        var fileBtn = $(this).closest('.file-box').find('.file-btn');
                        if (validateImgFile(this)) {
                            previewURL(fileBtn, this);
                        }
                    });
                    ///////////////////////////////////// End Admin Panel Ajax  ////////////////////////////////////////

                    //////////////////////////////////////// Site Ajax  //////////////////////////////////////////////////


                    /***************************************************************************
                     * Custom Ajax request function
                     * @param string url
                     * @param mixed|FormData data
                     * @param callable(data) completeHandler
                     * @param callable errorHandler
                     * @param callable progressHandler
                     * @returns void
                     **************************************************************************/
                    function _(data) {
                        console.log(data);
                    }

                    function request(url, data, completeHandler, errorHandler, progressHandler) {
                        if (typeof progressHandler === 'string' || progressHandler instanceof String) {
                            method = progressHandler;
                        } else {
                            method = "POST"
                        }

                        $.ajax({
                            url: url, //server script to process data
                            type: method,
                            xhr: function () {  // custom xhr
                                myXhr = $.ajaxSettings.xhr();
                                if (myXhr.upload && $.isFunction(progressHandler)) { // if upload property exists
                                    myXhr.upload.addEventListener('progress', progressHandler, false); // progressbar
                                }
                                return myXhr;
                            },
                            // Ajax events
                            success: completeHandler,
                            error: errorHandler,
                            // Form data
                            data: data,
                            // Options to tell jQuery not to process data or worry about the content-type
                            cache: false,
                            contentType: false,
                            processData: false
                        }, 'json');
                    }

                    /***********************************************************************
                     * Notify with a message in shape of fancy alert
                     **********************************************************************/

                    function notify(status, title, msg, type) {
                        status = (status == 'error' ? 'danger' : status);
                        var callable = null;
                        var template = null;
                        var icons = {
                            'danger': 'fa-ban',
                            'success': 'fa-check',
                            'info': 'fa-info',
                            'warning': 'fa-warning'
                        };
                        if ($.isFunction(type)) {
                            callable = type;
                            type = 'modal';
                        }

                        if (!type || type == 'm') {
                            type = 'modal';
                        } else if (type == 'f') {
                            type = 'flash';
                        }

                        template = $("#alert-" + type).html();
                        template = template.replace(new RegExp('{icon}', 'g'), icons[status]);
                        template = template.replace(new RegExp('{status}', 'g'), status);
                        template = template.replace(new RegExp('{title}', 'g'), title);
                        template = template.replace(new RegExp('{msg}', 'g'), msg);
                        switch (type) {
                            case 'modal':
                                var modal = $(template).modal('toggle');
                                if ($.isFunction(callable)) {
                                    modal.on("hidden.bs.modal", callable);
                                }
                                return;
                            default:
                                $('#alert-box').html(template);
                        }

                    }
                    /***************************************************************************
                     * identify Tinymce
                     **************************************************************************/
                    if (typeof tinymce !== "undefined") {
                        /*Text area Editors
                         =========================*/

                        tinymce.init({
                            selector: '.tiny-editor',
                            height: 350,
                            theme: 'modern',
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table contextmenu paste code'
                            ],
                            toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                            content_css: '//www.tinymce.com/css/codepen.min.css'
                        });

                    }
                })();

