$(document).ready(function () {
    // PROJECT BUTTONS INIT
    $("#design_b").attr("src", btnInfo["#design_b"].off);
    $("#video_b").attr("src", btnInfo["#video_b"].off);
    $("#photo_b").attr("src", btnInfo["#photo_b"].off);
    $("#writing_b").attr("src", btnInfo["#writing_b"].off);
    // DESIGN BUTTONS INIT
    $("#des_icon_b").attr("src", btnInfo["#des_icon_b"].off);
    $("#des_brand_b").attr("src", btnInfo["#des_brand_b"].off);
    $("#des_cl_b").attr("src", btnInfo["#des_cl_b"].off);
    $("#des_other_b").attr("src", btnInfo["#des_other_b"].off);
    // VIDEO BUTTONS INIT
    $("#vid_inter_b").attr("src", btnInfo["#vid_inter_b"].off);
    $("#vid_prom_b").attr("src", btnInfo["#vid_prom_b"].off);
    $("#vid_mv_b").attr("src", btnInfo["#vid_mv_b"].off);
    $("#vid_sfilm_b").attr("src", btnInfo["#vid_sfilm_b"].off);
    $("#vid_concp_b").attr("src", btnInfo["#vid_concp_b"].off);
    $("#vid_other_b").attr("src", btnInfo["#vid_other_b"].off);
    // PHOTO BUTTONS INIT
    $("#photo_head_b").attr("src", btnInfo["#photo_head_b"].off);
    $("#photo_events_b").attr("src", btnInfo["#photo_events_b"].off);
    $("#photo_other_b").attr("src", btnInfo["#photo_other_b"].off);
    // WRITING BUTTONS INIT
    $("#writin_copyw_b").attr("src", btnInfo["#writin_copyw_b"].off);
    $("#writing_pr_b").attr("src", btnInfo["#writing_pr_b"].off);
    $("#writing_other_b").attr("src", btnInfo["#writing_other_b"].off);

    $('select').formSelect();
    $('textarea#des_cp_text', 'textarea#design_other_txt').characterCounter();
    $("#title").delay(500).fadeIn(2000);
    $("#logo").delay(500).fadeIn(2000);
    $("#quote-card").delay(1500).fadeIn(2000);
    $("#stuff-card").delay(1500).fadeIn(2000);
});

// -------------------------------- FUNCTIONS -------------------------------------
// QUOTE LOGIC --------------

function quote_selection(formId, buttonID) {
    if(currentSelections.button_id != buttonID)  {
        $(currentSelections.form_id).hide();
        $(currentSelections.form_id).trigger("reset");
        $(formId).fadeIn(500);
        currentSelections.form_id = formId;
        if(currentSelections.button_id != null) {
            toggle_button_selected(currentSelections.button_id);
            currentSelections.button_id = null;
        }
        currentSelections.button_id = buttonID;
        toggle_button_selected(buttonID);        
        hide_other_inputs();
    }
}

function hide_other_inputs() {
    for(let i = 0; i < currentSelections.others.length; i++) {
        var temp = currentSelections.others[i];
        $(temp).hide();
    }
    currentSelections.others = [];
}


function project_change(proj_button, bcontainer_id) {
    if(currentSelections.proj_button != proj_button) {
        if(currentSelections.proj_button != null) {
            toggle_button_selected(currentSelections.proj_button);
        }
        if(currentSelections.button_id != null) {
            toggle_button_selected(currentSelections.button_id);
            currentSelections.button_id = null;
        }
        $(currentSelections.form_id).hide();
        $(currentSelections.form_id).trigger("reset");
        if(bcontainer_id != currentSelections.open_buttons) {
            $(currentSelections.open_buttons).hide();
        }
        hide_other_inputs();
        $(bcontainer_id).fadeIn(500);
        currentSelections.open_buttons = bcontainer_id;
        toggle_button_selected(proj_button);
        currentSelections.proj_button = proj_button;
    }

}

function other_text_display(inputId, textID) {
    if(inputId != null && textID != null && $(inputId).val() != null) {
        if($(inputId).val().includes("Other") || $(inputId).val() == "Yes") {        
            $(textID).show();
            if(currentSelections.others.indexOf(textID) <= -1) {
                currentSelections.others[currentSelections.others.length] = textID;
            }
        } else {
            $(textID).hide();
            if(currentSelections.others.indexOf(textID) !== -1) {
                var index = currentSelections.others.indexOf(textID);
                currentSelections.others.splice(index, 1);
            }
        }
    }
}

function form_submit(formID) {
    if(formID == currentSelections.form_id) {        
        for(const [k, v] of Object.entries(formDict[currentSelections.form_id])) {
            for(let i = 0; i < formDict[currentSelections.form_id][k].length; i++) {                
                pdfText[currentSelections.form_id][k][i+1] = $(v[i]).val();
            }        
        }       
    }
    create_new_pdf();
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

    
    
    let offset = 200;
    let rowHeight = 40;
    for (const [k, v] of Object.entries(pdfText[currentSelections.form_id])) {        
        for(let i = 0; i < v.length; i++) {
            let tmp = pdfText[currentSelections.form_id][k][i];
            let splitTextAns;
            if(tmp != null) {
                if(i == 0) {
                    splitTextAns = pdf.splitTextToSize(tmp, 530);
                    if((pdf.getTextDimensions(splitTextAns).h)*3 >= (820 - offset)) {
                        pdf.addPage();
                        offset = 50;
                        pdf.text(splitTextAns, 40, offset);
                    } else {
                        pdf.text(splitTextAns, 40, offset);
                    }
                    
                } else {
                    splitTextAns = pdf.splitTextToSize(tmp, 490);                    
                    if(((pdf.getTextDimensions(splitTextAns).h)*3) + offset > 850) {
                        if(((pdf.getTextDimensions(splitTextAns).h)*3) >= 600) {

                            var arr = splitTextAns,
                            mid = Math.ceil(arr.length/2),
                            obj = {
                                left: arr.slice(0, mid),
                                right: arr.slice(mid)
                            };
                            if((pdf.getTextDimensions(obj.left).h)*3 >= (820 - offset)) {
                                pdf.addPage();
                                offset = 50;
                                pdf.text(obj.left, 60, offset);
                                offset = offset + ((pdf.getTextDimensions(obj.left).h)*3);
                                if((pdf.getTextDimensions(obj.right).h)*3 >= (820 - offset)) {
                                    pdf.addPage();
                                    offset = 50;
                                    pdf.text(obj.right, 60, offset);
                                } else {
                                    pdf.text(obj.right, 60, offset);
                                    offset = offset + ((pdf.getTextDimensions(obj.right).h)*3);
                                }
                            } else {
                                pdf.text(obj.left, 60, offset);
                                pdf.addPage();
                                offset = 50;
                                pdf.text(obj.right, 60, offset);
                            }
                            offset = offset + ((pdf.getTextDimensions(obj.right).h)*3);
                            continue;
                        } else {
                            pdf.addPage();
                            offset = 50;
                        }
                        
                    } 
                    pdf.text(splitTextAns, 60, offset);    
                                 
                }                               
                offset = offset + ((pdf.getTextDimensions(splitTextAns).h)*3);                
            }
        }        
    }
      

    var iframe = document.getElementById("prev_frame");
    console.log(iframe);    
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
    if(btnInfo[id].isOn) {
        $(id).attr("src", btnInfo[id].off);
        btnInfo[id].isOn = false;
    } else {
        $(id).attr('selected');
        $(id).attr("src", btnInfo[id].on);
        btnInfo[id].isOn = true;
    }
}

// ----------------------