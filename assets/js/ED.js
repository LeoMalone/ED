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

    $(".collapsible").collapsible();
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
    if($(inputId).val() == "Other" || $(inputId).val() == "Yes") {        
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

function form_submit(formID) {
    if(formID == currentSelections.form_id) {
        // get all the inputs into an arrays.
        var $inputs = $(formID.concat(" :input"));
        var $txtAreas = $(formID.concat(" textarea"));
        var $selects = $(formID.concat(" select"));

        //combine all arrays into single input array
        var values = {};
        $inputs.each(function() {
            values[this.id] = $(this).val();
        });
        $txtAreas.each(function() {
            values[this.id] = $(this).val();
        });
        $selects.each(function() {
            values[this.id] = $(this).val();
        });
        currentSelections.form_data = values;
        console.log(currentSelections.form_data);
        create_new_pdf();
    }
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
    
    let q_offset = 200;
    let a_offset = 230;
    for(let x = 0; x < pdfText[currentSelections.form_id].length; x++) {
        let tmp_q = pdfText[currentSelections.form_id][x];
        let splitText = pdf.splitTextToSize(tmp_q, 530);
        pdf.text(splitText, 40, q_offset);

        // let tmp = currentSelections.form_data[x];
        // let splitTextAns = pdf.splitTextToSize(tmp, 530);
        // pdf.text(splitTextAns, 40, a_offset);
        q_offset += 80;
    }

    // var i = 40;
    // for (const [k, v] of Object.entries(currentSelections.form_data)) {
    //     pdf.text(v, 40, i);
    //     i += 40;        
    // }    

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
        console.log("OFF");
    } else {
        $(id).attr('selected');
        $(id).attr("src", btnInfo[id].on);
        btnInfo[id].isOn = true;
    }
}

// ----------------------