$(document).ready(function () {
    $('.collapsible').collapsible();
    $('#title').delay(500).fadeIn(2000);
    $('#logo').delay(500).fadeIn(2000);
    $('#quote-card').delay(1500).fadeIn(2000);
    $('#stuff-card').delay(1500).fadeIn(2000);
});

$("#quote-card").click(function() {
    $('html, body').animate({
        scrollTop: $("#quote-title").offset().top
    }, 2000);
});

$("#stuff-card").click(function() {
    $('html, body').animate({
        scrollTop: $("#stuff-title").offset().top
    }, 2000);
});

// Color change for index page buttons
$("#quote-card").hover(function(){
   $("#quote-text").css("color", "white");
   $("#q").css("color", "#C7A16D");
}, function() {
    $("#quote-text").css("color", "#C7A16D");
    $("#q").css("color", "#4E596E");
});

$("#stuff-card").hover(function(){
   $("#stuff-text").css("color", "white");
   $("#s").css("color", "#C7A16D");
}, function() {
    $("#stuff-text").css("color", "#C7A16D");
    $("#s").css("color", "#4E596E");
});


// -------------------------------- FUNCTIONS -------------------------------------
// QUOTE LOGIC --------------
var currentSelections = {
    form_id: null, 
    button_id: null, 
    others: [], 
    form_data: [] 
};

function quote_selection(formId, buttonID) {
    if(currentSelections) {
        $(currentSelections.form_id).hide();
        $(currentSelections.form_id).trigger("reset");
        $(currentSelections.button_id).removeClass("c_selected");
    }
    $(buttonID).addClass("c_selected");
    $(formId).fadeIn(1000);
    currentSelections.form_id = formId;
    currentSelections.button_id = buttonID;
    hide_other_inputs();
}

function hide_other_inputs() {
    for(let i = 0; i < currentSelections.others.length; i++) {
        var temp = currentSelections.others[i];
        $(temp).hide();
    }
    currentSelections.others = [];
}

function project_change() {
    if(currentSelections) {
        $(currentSelections.form_id).hide();
        $(currentSelections.form_id).trigger("reset");
        $(currentSelections.button_id).removeClass("c_selected");
        hide_other_inputs();
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
        create_new_pdf();
    }
}

function create_new_pdf() {
    var doc = new jsPDF();
    
    for (let index = 0; index < currentSelections.form_data.length; ++index) {
        console.log(currentSelections.form_data);
    }
    
    //doc.save('two-by-four.pdf');
}

function toggle_checkbox_value(inputId, newVal) {
    if($(inputId).is(':checked')) {
        $(inputId).val(newVal);
    } else {
        $(inputId).val("");
    }
}

// ----------------------