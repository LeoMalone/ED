"use strict";
var ed_data;
var pdf;
$(document).ready(function () {
    // Initilize site data
    ed_data = new ED_Data();

    // Initialize all buttons to off sources
    for(const [k, v] of Object.entries(ed_data.btnInfo)) {
        $(k).attr("src", v.off);
    }

    // Materialize initializations
    $('.fixed-action-btn').floatingActionButton();
    $('.tooltipped').tooltip();
    $('select').formSelect();
    $('.modal').modal();
    $('textarea').characterCounter();
    $('.materialboxed').materialbox();
    $('.tabs').tabs();

    // Initial Logo/Buttons fade in
    $("#title").delay(500).fadeIn(2000);
    $("#logo").delay(500).fadeIn(2000);
    $("#quote-card").delay(1500).fadeIn(2000);
    $("#stuff-card").delay(1500).fadeIn(2000);
});

// FORM DICTIONARY
var formDict = {
    // DESIGN
    "#des_icons": {
        0: ["#num_icons"],
        1: ["#icon_desc"]
    },
    "#des_brand_logo": {
        0: ["#num_options"],
        1: ["#col_scheme_switch"],
        2: ["#ref_img_switch", "#brand_ref_img"],
    },
    "#des_concept_layout": {
        0: ["#des_cp_text"]
    },
    "#design_other": {
        0: ["#design_other_txt"],
        1: ["#design_other_length"]
    },
    // VIDEO
    "#video_form": {
        0: ["#video_length"],
        1: ["#video_series_swicth"],
        2: ["#video_scouted_switch", "#video_booked_switch"],
        3: ["#video_strybrd_switch", "#video_sbdev_switch"],
        4: ["#video_txt"]
    },
    "#video_other": {
        0: ["#video_other_txt"],
        1: ["#vid_other_length"]
    },
    // PHOTO
    "#photo_head": {
        0: ["#num_ppl"],
        1: ["#num_looks"],
        2: ["#photo_lighting_switch"],
        3: ["#photo_wardrobe_switch"],
        4: ["#photo_location_switch"],
        5: ["#photo_studio_switch"]
    },
    "#photo_events": {
        0: ["#photo_num_deliv"],
        1: ["#photo_event_length"],
        2: ["#photo_events_select", "#photo_events_other"],
        3: ["#final_del"],
        4: ["#photo_travel_switch"]
    },
    "#photo_other": {
        0: ["#photo_other_text"]
    },

    // WRITING
    "#writing_copyw": {
        0: ["#writing_copyw_projt"],
        1: ["#writing_copyw_pages"]
    },
    "#writing_pr": {
        0: ["#writing_pr_mediar", "#writing_pr_o1_txt"],
        1: ["#writing_pr_req", "#writing_pr_o2_txt"]
    },
    "#writing_other": {
        0: ["#writing_other_text"]
    }
};

// -------------------------------- FUNCTIONS -------------------------------------
// QUOTE LOGIC --------------
// Main project selection change (4 options)
function project_change(project_b, bcontainer_id) {
    // If button being pressed isn't the same button
    if(ed_data.proj_button != project_b) {
        // De-select current project button
        if(ed_data.proj_button != null) {
            toggle_button_selected(ed_data.proj_button);
        }
        // De-select current quote button
        if(ed_data.button_id != null) {
            toggle_button_selected(ed_data.button_id);
            ed_data.button_id = null;
        }
        // Hide and reset currently open form
        $(ed_data.form_id).hide();
        $(ed_data.form_id).trigger("reset");
        $(".helper-text").remove();

        // If the button conatiner id is not the same hide buttons
        if(bcontainer_id != ed_data.open_buttons) {
            $(ed_data.open_buttons).hide();
        }
        // Hide open "Other" inputs
        if(ed_data.others.length > 0)
            hide_other_inputs();

        // Fade in and scroll to the buttons section
        $(bcontainer_id).fadeIn(500);
        scroll_to(bcontainer_id); 
        ed_data.open_buttons = bcontainer_id;
        
        toggle_button_selected(project_b);
        ed_data.proj_button = project_b;
    }
}

// Quote type selection change (16 options) 
function quote_selection(formId, buttonID) {
    if(ed_data.button_id != buttonID)  {
        $(ed_data.form_id).hide();
        $(ed_data.form_id).trigger("reset");
        $(".helper-text").remove();

        $(formId).fadeIn(500);
        $("html, body").animate({
            scrollTop: $(formId).offset().top,
        }, 750, "swing");
        ed_data.form_id = formId;
        if(ed_data.button_id != null) {
            toggle_button_selected(ed_data.button_id);
            ed_data.button_id = null;
        }
        ed_data.button_id = buttonID;
        toggle_button_selected(buttonID);
        
        if(ed_data.others.length > 0)
            hide_other_inputs();
    }
}

// Hide all other option inputs
function hide_other_inputs() {    
    for(let i = 0; i < ed_data.others.length; i++) {
        $(ed_data.others[i]).hide();
    }
    ed_data.others = [];    
}

// Show or hide a specific other input
function other_text_display(inputId, textID) {
    if(inputId != null && textID != null && $(inputId).val() != null) {
        if($(inputId).val().includes("Other") || $(inputId).val() == "Yes") {        
            $(textID).show();
            if(ed_data.others.indexOf(textID) <= -1) {
                ed_data.others[ed_data.others.length] = textID;
            }
        } else {
            $(textID).hide();
            if(ed_data.others.indexOf(textID) !== -1) {
                var index = ed_data.others.indexOf(textID);
                ed_data.others.splice(index, 1);
            }
        }
    }
}

// toggle the value of the clicked checkbox
function toggle_checkbox_value(inputId, newValOn, newValOff) {
    if($(inputId).is(":checked")) {
        $(inputId).val(newValOn);
    } else {
        $(inputId).val(newValOff);
    }
}

// toggle the img src value for the clicked button
function toggle_button_selected(id) {
    if(ed_data.btnInfo[id].isOn) {
        $(id).attr("src", ed_data.btnInfo[id].off);
        ed_data.btnInfo[id].isOn = false;
    } else {
        $(id).attr('selected');
        $(id).attr("src", ed_data.btnInfo[id].on);
        ed_data.btnInfo[id].isOn = true;
    }
}

// Quote submission form
function form_submit() {    
    $('#submit_modal_form').hide();
    $('#submit_modal_foot').hide();
    $('#submit_modal_spn').show();

    ed_data.name = $("#first_name").val();
    ed_data.email = $("#email_input").val();

    for(const [k, v] of Object.entries(formDict[ed_data.form_id])) {
        for(let i = 0; i < formDict[ed_data.form_id][k].length; i++) {        
            ed_data.pdfText[ed_data.form_id][k][i+1] = $(v[i]).val();
        }        
    }
    
    var tmp =  $('#brand_ref_file').get(0).files[0]; 
    if(tmp != null) {
        var reader  = new FileReader();
        reader.readAsDataURL(tmp);
        reader.onload = function(e) {
            ed_data.attachment = reader.result;
            create_new_pdf();             
        };
    } else {
        create_new_pdf();
    }   
}

// PDF LOGIC --------------
function create_new_pdf() {
    pdf = new jsPDF('p', 'pt', 'letter');
    $('#pdf_inner').append('<div>' + ed_data.name + '</div>');
    $('#pdf_inner').append('<div>' + ed_data.email + '</div>');
    let value;
    for (const [k, v] of Object.entries(ed_data.pdfText[ed_data.form_id])) {
        for(let i = 0; i < v.length; i++) {
            value = ed_data.pdfText[ed_data.form_id][k][i];
            console.log(value, k, i);
            if(i == 0) {
                $('#pdf_inner').append('<h6 class="secondary">' + value + '</h6>');
            } else {
                $('#pdf_inner').append("<div>" + value + "</div>");
            }
        }
    }
    
    // Optional - set properties on the document
    pdf.setProperties({
        title: "ED - QUOTE",
        subject: "Auto generated pdf for ED quote form",
        creator: "ED"
    });

    let specialElementHandlers = {
        '#bypassme': function (element, renderer) {
            return true
        }
    };

    let margins = {
        top: 20,
        bottom: 60,
        left: 40,
        width: 522
    };

    let source = $('#pdf_container')[0];
    pdf.fromHTML(
        source, // HTML string or DOM elem ref.
        margins.left, // x coord
        margins.top, { // y coord
        'width': margins.width, // max width of content on PDF
        'elementHandlers': specialElementHandlers
    },
        function (dispose) {
            send_email();
        }, margins
    );
}

function send_email() {
    // Setup attachments
    var atts = [];
    atts[0] = {
        name: "ED Quote Application.pdf",
        data: pdf.output('datauristring')
    }
    if(ed_data.attachment != null) {
        atts[1] = {
            name: $("#brand_ref_img").val(),
            data: ed_data.attachment
        }
    }

    // SEND EMAIL
    Email.send({
        SecureToken : "bfa28959-e0b8-4a29-a78f-f3c281fa4249",
        To : "edsquared.email@gmail.com",
        From : "postmaster@sandboxdd1ae4e941f9495ebf87c21372edf9c0.mailgun.org",
        Subject : "ED - Quote Application",
        Body : "This is an auto generated email. Please see attachment for quote application.",
        Attachments: atts
    }).then(function(message) {
        console.log(message);
        $('#submit_modal_spn').hide();
        $('#submit_modal_done').show();
        $('#submit_modal_cls').show();
        reset_form_data();         
    });
}

function reset_submit() {
    $('#submit_modal').modal('close');
    $('#submit_modal_cls').hide();
    $('#submit_modal_done').hide();
    $('#submit_modal_form').show();
    $('#submit_modal_foot').show();
    $("#pdf_inner").html("");
    
}
function reset_form_data() {
    //reset form data and selected buttons
    $(ed_data.form_id).hide();
    $(ed_data.form_id).trigger("reset");
    $("#modal_form").trigger("reset");
    $(ed_data.open_buttons).hide();
    if(ed_data.others.length > 0)
        hide_other_inputs();
    toggle_button_selected(ed_data.proj_button);
    toggle_button_selected(ed_data.button_id);

    ed_data = new ED_Data();
}
// ----------------------