"use strict";
var ed_data;
var pdf = new jsPDF("p", "pt", "a4");

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

// toggle the value of the cciked checkbox
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

    for(const [k, v] of Object.entries(ED_Data.formDict[ed_data.form_id])) {
        for(let i = 0; i < ED_Data.formDict[ed_data.form_id][k].length; i++) {        
            ed_data.pdfText[ed_data.form_id][k][i+1] = $(v[i]).val();
        }        
    }
    
    var tmp =  $('#brand_ref_file').get(0).files[0];   
    if(tmp != null) {
        var reader  = new FileReader();
        reader.readAsDataURL(tmp);
        reader.onload = function(e) {
            ed_data.attachment = reader.result;
            console.log(ed_data.attachment);
            create_new_pdf();
            reset_form_data();
        };
    } else {
        create_new_pdf();
        reset_form_data();
    }    
}

// PDF LOGIC --------------
function create_new_pdf() {
    
    // Optional - set properties on the document
    pdf.setProperties({
        title: "ED - QUOTE",
        subject: "Auto generated pdf for ED quote form",
        creator: "ED"
    });
    create_pdf_header();   
    
    let offset = 200;
    let pr_offset = 40;
    var heightOffset = 2.7;
    for (const [k, v] of Object.entries(ed_data.pdfText[ed_data.form_id])) {        
        for(let i = 0; i < v.length; i++) {
            let tmp = ed_data.pdfText[ed_data.form_id][k][i];
            let splitTextAns;
            if(tmp != null) {
                if(i == 0) {
                    splitTextAns = pdf.splitTextToSize(tmp, 530);
                    if((pdf.getTextDimensions(splitTextAns).h)*heightOffset >= (820 - offset)) {
                        pdf.addPage();
                        offset = 50;
                        pdf.text(splitTextAns, 40, offset);
                    } else {
                        pdf.text(splitTextAns, 40, offset);
                    }
                    offset += ((pdf.getTextDimensions(splitTextAns).h)*heightOffset);    
                    continue;
                    
                } else {
                    splitTextAns = pdf.splitTextToSize(tmp, 490);                    
                    if(((pdf.getTextDimensions(splitTextAns).h)*heightOffset) + offset > 850) {
                        if(((pdf.getTextDimensions(splitTextAns).h)*heightOffset) >= 600) {

                            var arr = splitTextAns,
                            mid = Math.ceil(arr.length/2),
                            obj = {
                                left: arr.slice(0, mid),
                                right: arr.slice(mid)
                            };
                            if((pdf.getTextDimensions(obj.left).h)*heightOffset >= (820 - offset)) {
                                pdf.addPage();
                                offset = 50;
                                pdf.text(obj.left, 60, offset);
                                offset += ((pdf.getTextDimensions(obj.left).h)*heightOffset);
                                if((pdf.getTextDimensions(obj.right).h)*heightOffset >= (820 - offset)) {
                                    pdf.addPage();
                                    offset = 50;
                                    pdf.text(obj.right, 60, offset);
                                } else {
                                    pdf.text(obj.right, 60, offset);
                                    offset += ((pdf.getTextDimensions(obj.right).h)*heightOffset);
                                }
                            } else {
                                pdf.text(obj.left, 60, offset);
                                pdf.addPage();
                                offset = 50;
                                pdf.text(obj.right, 60, offset);
                            }
                            offset += ((pdf.getTextDimensions(obj.right).h)*heightOffset);
                            continue;
                        } else {
                            pdf.addPage();
                            offset = 50;
                        }                        
                    }
                    pdf.text(splitTextAns, 60, offset);                                 
                }
                if(ed_data.form_id == "#writing_pr") {
                    offset = offset + pr_offset + ((pdf.getTextDimensions(splitTextAns).h)*heightOffset);
                    pr_offset += 10;  
                } else {
                    offset += ((pdf.getTextDimensions(splitTextAns).h)*heightOffset);    
                }            
            }
        }        
    }
    send_email();
}

function create_pdf_header() {
    pdf.setFont("Iowan Old Style");
    pdf.setFontSize(15);
    pdf.setFillColor(197, 176, 151);
    pdf.roundedRect(10, 10, 575, 100, 10, 10, "F");
    pdf.addImage(imgData, "JPEG", 30, 30, 108, 110);

    pdf.setDrawColor(209, 207, 208);
    pdf.setLineWidth(0.1);
    pdf.line(155, 85, 540, 85); // horizontal line
    pdf.line(155, 35, 540, 35); // horizontal line

    pdf.setFontSize(30);
    pdf.setTextColor(75, 86, 107);
    pdf.text("- QUOTE APPLICATION -", 165, 70);
    pdf.setFontSize(15);
    
    // Add name and email
    pdf.text(ed_data.name, 165, 150);
    pdf.text(ed_data.email, 320, 150); 
}

function send_email() {
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
    });
}

function reset_submit() {
    $('#submit_modal').modal('close');
    $('#submit_modal_cls').hide();
    $('#submit_modal_done').hide();
    $('#submit_modal_form').show();
    $('#submit_modal_foot').show();
    
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

    ed_data.form_id = null;
    ed_data.open_buttons = null;
    ed_data.proj_button = null;
    ed_data.button_id = null;
    ed_data.name = null;
    ed_data.email = null;
}
// ----------------------