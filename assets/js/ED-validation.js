// VALIDATOR DEFAULTS
$.validator.setDefaults({
    errorClass: "invalid",
    validClass: "valid",
    errorPlacement: function (error, element) {
        $(element)
            .closest("form")
            .find("span[class='helper-text']")
            .attr('data-error', error.text());
    },
    submitHandler: function () {
        $('#submit_modal').modal('open');
    }
});
// ICONS
$("#des_icons").validate({
    rules: {
        num_icons: {
            required: true,
            min: 1,
            minlength: 1,
            maxlength: 3
        }
    }
});
// BRANDING/LOGO
$("#des_brand_logo").validate({
    rules: {
        num_options: {
            required: true,
            min: 1,
            minlength: 1,
            maxlength: 3
        },
        col_scheme_switch: {},
        ref_img_switch: {},
        brand_ref_img: {},
    }
});
// CONCEPT LAYOUT
$("#des_concept_layout").validate({
    rules: {
        des_cp_text: {
            required: true,
            minlength: 1,
            maxlength: 2000
        }
    }
});
// (DESIGN) OTHER
$("#design_other").validate({
    rules: {
        design_other_txt: {
            required: true,
            minlength: 1,
            maxlength: 2000
        },
        design_other_length: {
            required: true,
            min: 1,
            minlength: 1,
            maxlength: 3
        }
    }
});
// COMMON VIDEO FORM
$("#video_form").validate({
    rules: {
        video_length: {
            required: true,
            min: 1,
            minlength: 1,
            maxlength: 3
        },
        video_txt: {
            required: true,
            minlength: 1,
            maxlength: 2000
        }
    }
});
// (VIDEO) OTHER
$("#video_other").validate({
    rules: {
        video_other_txt: {
            required: true,
            minlength: 1,
            maxlength: 2000
        },
        vid_other_length: {
            required: true,
            min: 1,
            minlength: 1,
            maxlength: 3
        }
    }
});
// HEADSHOTS
$("#photo_head").validate({
    rules: {
        num_ppl: {
            required: true,
            minlength: 1,
            maxlength: 2000
        },
        num_looks: {
            required: true,
            min: 1,
            minlength: 1,
            maxlength: 3
        }
    }
});
// EVENTS
$("#photo_events").validate({
    rules: {
        photo_num_deliv: {
            required: true,
            min: 1,
            minlength: 1,
            maxlength: 3
        },
        photo_event_length: {
            required: true,
            min: 1,
            minlength: 1,
            maxlength: 3
        },
        photo_events_select: {
            required: true
        },
        photo_events_other: {
            required: function (element) {
                return $("#photo_events_select").val() === "Other";
            },
            minlength: 1,
            maxlength: 200
        },
        final_del: {
            required: true,
            minlength: 1,
            maxlength: 3
        }
    }
});
// (PHOTO) OTHER)
$("#photo_other").validate({
    rules: {
        photo_other_text: {
            required: true,
            minlength: 1,
            maxlength: 2000
        }
    }
});
// COPYWRITING
$("#writing_copyw").validate({
    rules: {
        writing_copyw_projt: {
            required: true,
        },
        writing_copyw_pages: {
            required: true,
            minlength: 1,
            maxlength: 3
        }
    }
});
// PUBLIC RELATIONS
$("#writing_pr").validate({
    rules: {
        writing_pr_mediar: {
            required: true
        },
        writing_pr_o1_txt: {
            required: function (element) {
                return $("#writing_pr_mediar").val().includes("Other");
            },
            minlength: 1,
            maxlength: 200
        },
        writing_pr_req: {
            required: true
        },
        writing_pr_o2_txt: {
            required: function (element) {
                return $("#writing_pr_req").val().includes("Other");
            },
            minlength: 1,
            maxlength: 200
        }
    }
});
// (WRITING) OTHER
$("#writing_other").validate({
    rules: {
        writing_other_text: {
            required: true,
            minlength: 1,
            maxlength: 2000
        }
    }
});

// NAME/EMAIL
$("#modal_form").validate({
    rules: {
        first_name: {
            required: true,
            minlength: 1,
            maxlength: 100
        },
        email_input: {
            required: true,
            minlength: 1,
            maxlength: 100
        }
    },
    submitHandler: function () {
        form_submit();
    }
});