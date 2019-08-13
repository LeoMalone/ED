var ed_data;

$(document).ready(function () {
    ed_data = new ED_Data();

    // PROJECT BUTTONS INIT
    $("#design_b").attr("src", ed_data.btnInfo["#design_b"].off);
    $("#video_b").attr("src", ed_data.btnInfo["#video_b"].off);
    $("#photo_b").attr("src", ed_data.btnInfo["#photo_b"].off);
    $("#writing_b").attr("src", ed_data.btnInfo["#writing_b"].off);
    // DESIGN BUTTONS INIT
    $("#des_icon_b").attr("src", ed_data.btnInfo["#des_icon_b"].off);
    $("#des_brand_b").attr("src", ed_data.btnInfo["#des_brand_b"].off);
    $("#des_cl_b").attr("src", ed_data.btnInfo["#des_cl_b"].off);
    $("#des_other_b").attr("src", ed_data.btnInfo["#des_other_b"].off);
    // VIDEO BUTTONS INIT
    $("#vid_inter_b").attr("src", ed_data.btnInfo["#vid_inter_b"].off);
    $("#vid_prom_b").attr("src", ed_data.btnInfo["#vid_prom_b"].off);
    $("#vid_mv_b").attr("src", ed_data.btnInfo["#vid_mv_b"].off);
    $("#vid_sfilm_b").attr("src", ed_data.btnInfo["#vid_sfilm_b"].off);
    $("#vid_concp_b").attr("src", ed_data.btnInfo["#vid_concp_b"].off);
    $("#vid_other_b").attr("src", ed_data.btnInfo["#vid_other_b"].off);
    // PHOTO BUTTONS INIT
    $("#photo_head_b").attr("src", ed_data.btnInfo["#photo_head_b"].off);
    $("#photo_events_b").attr("src", ed_data.btnInfo["#photo_events_b"].off);
    $("#photo_other_b").attr("src", ed_data.btnInfo["#photo_other_b"].off);
    // WRITING BUTTONS INIT
    $("#writin_copyw_b").attr("src", ed_data.btnInfo["#writin_copyw_b"].off);
    $("#writing_pr_b").attr("src", ed_data.btnInfo["#writing_pr_b"].off);
    $("#writing_other_b").attr("src", ed_data.btnInfo["#writing_other_b"].off);

    $('.fixed-action-btn').floatingActionButton();
    $('.tooltipped').tooltip();
    $('select').formSelect();
    $('.modal').modal();
    $('textarea').characterCounter();
    $("#title").delay(500).fadeIn(2000);
    $("#logo").delay(500).fadeIn(2000);
    $("#quote-card").delay(1500).fadeIn(2000);
    $("#stuff-card").delay(1500).fadeIn(2000);
});

// -------------------------------- FUNCTIONS -------------------------------------
// QUOTE LOGIC --------------
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
        hide_other_inputs();

        // Fade in and scroll to the buttons section
        $(bcontainer_id).fadeIn(500);
        $("html, body").animate({
            scrollTop: $(bcontainer_id).offset().top
        }, 750);
        // 
        ed_data.open_buttons = bcontainer_id;
        toggle_button_selected(project_b);
        ed_data.proj_button = project_b;
    }
}

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
        hide_other_inputs();
    }
}

function hide_other_inputs() {
    if(ed_data.others != null) {
        for(let i = 0; i < ed_data.length; i++) {
            var temp = ed_data.others[i];
            $(temp).hide();
        }
        ed_data.others = [];
    }
}

function other_text_display(inputId, textID) {
    if(inputId != null && textID != null && $(inputId).val() != null) {
        if($(inputId).val().includes("Other") || $(inputId).val() == "Yes") {        
            $(textID).show();
            if(ed_data.others.indexOf(textID) <= -1) {
                ed_data.others[ed_data.length] = textID;
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

function form_submit() {
    ed_data.name = $("#first_name").val();
    ed_data.email = $("#email_input").val();
    for(const [k, v] of Object.entries(ED_Data.formDict[ed_data.form_id])) {
        for(let i = 0; i < ED_Data.formDict[ed_data.form_id][k].length; i++) {        
            ed_data.pdfText[ed_data.form_id][k][i+1] = $(v[i]).val();
        }        
    }
    create_new_pdf();

    //reset form data and selected buttons
    $(ed_data.form_id).hide();
    $(ed_data.form_id).trigger("reset");
    $(ed_data.open_buttons).hide();
    hide_other_inputs();
    toggle_button_selected(ed_data.proj_button);
    toggle_button_selected(ed_data.button_id);
    
}

function create_new_pdf() {
    var pdf = new jsPDF("p", "pt", "a4");
    // Optional - set properties on the document
    pdf.setProperties({
        title: "ED - QUOTE",
        subject: "Auto generated pdf for ED quote form",
        creator: "ED"
    });
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
    
    pdf.text(ed_data.name, 165, 150);
    pdf.text(ed_data.email, 320, 150);
    
    
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


    

    var iframe = document.getElementById("prev_frame");    
    iframe.src = pdf.output("datauristring");
}

function toggle_checkbox_value(inputId, newValOn, newValOff) {
    if($(inputId).is(":checked")) {
        $(inputId).val(newValOn);
    } else {
        $(inputId).val(newValOff);
    }
}

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
// ----------------------