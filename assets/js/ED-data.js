var currentSelections = {
    form_id: null,
    button_id: null,
    proj_button: null,
    open_buttons: null,
    others: [],
    answers: { 0: null, 1: null, 2: null, 3: null, 4: null, 5: null }
};

const formDict = {
    // DESIGN
    "#des_icons": {
        0: ["#num_icons"]
    },
    "#des_brand_logo": {
        0: ["#num_options"],
        1: ["#col_scheme_switch"],
        2: ["#ref_img_switch","#brand_ref_img"],
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
}

var pdfText = {
    // DESIGN
    "#des_icons": {
        0: ["How many icons do you need?", currentSelections.answers[0]]
    },
    "#des_brand_logo": {
        0: ["How many options would you like to see?", currentSelections.answers[0]],
        1: ["Do you have a colour scheme in mind?", currentSelections.answers[1]],
        2: ["Do you have any reference images to give us a sense of what you’re after?", currentSelections.answers[2]]
    },
    "#des_concept_layout": {
        0: ["Please describe, as best you can, the kind of project you’re looking to pitch.", currentSelections.answers[0]]
    },
    "#design_other": {
        0: ["Please describe, as best you can, the kind of video project you have in mind.", currentSelections.answers[0]],
        1: ["What is the estimated final length of the video you need?", currentSelections.answers[1]]
    },

    // VIDEO
    "#video_form": {
        0: ["What is the estimated length of the video?", currentSelections.answers[0]],
        1: ["Is this video part of a series?", currentSelections.answers[1]],
        2: ["Do you have your shooting location(s)...", currentSelections.answers[2], currentSelections.answers[3]],
        3: ["Do you have a storyboard? (if you do not, would you like a storyboard developed?)", currentSelections.answers[4], currentSelections.answers[5]],
        4: ["Please let us know about any other details for your video project:", currentSelections.answers[6]]
    },
    "#video_other": {
        0: ["Please describe, as best you can, the kind of video project you have in mind.", currentSelections.answers[0]],
        1: ["What is the estimated final length of the video you need?", currentSelections.answers[1]]
    },

    // PHOTO
    "#photo_head": {
        0: ["How many subjects need to be photographed?", currentSelections.answers[0]],
        1: ["How many looks/options per subject would you like?",  currentSelections.answers[1]],
        2: ["Would you like simple lighting retouches or airbrushing on the final products?",  currentSelections.answers[2]],
        3: ["Would you like make up and wardrobe available at the shoot?",  currentSelections.answers[3]],
        4: ["Do you have a preferred shooting location?",  currentSelections.answers[4]],
        5: ["Do you require a studio setting?",  currentSelections.answers[5]]
    },
    "#photo_events": {
        0: ["What is the estimated number of final deliverables (photos, panoramas, etc.) you’re looking for?", currentSelections.answers[0]],
        1: ["What is the duration of the event?", currentSelections.answers[1]],
        2: ["What kind of event is it?", currentSelections.answers[2], currentSelections.answers[3]],
        3: ["What are the final deliverables you would like to receive?", currentSelections.answers[4]],
        4: ["Would travel be required?", currentSelections.answers[5]]
    },
    "#photo_other": {
        0: ["Please describe, as best you can, the kind of photo project you have in mind.", currentSelections.answers[0]]
    },

    // WRITING
    "#writing_copyw": {
        0: ["What kind of project do you have in mind?", currentSelections.answers[0]],
        1: ["What is the estimated final length of the script you need?", currentSelections.answers[1]]
    },
    "#writing_pr": {
        0: ["Which of the following media relations opportunities are you interested in?", currentSelections.answers[0], currentSelections.answers[1]],
        1: ["Which of the following do you require?", currentSelections.answers[2], currentSelections.answers[3]]
    },
    "#writing_other": {
        0: ["Please describe, as best you can, the kind of photo project you have in mind.", currentSelections.answers[0]]
    }
};

// BUTTON SOURCES
var btnInfo = {
    // MAIN BUTTONS
    "#design_b": {
        isOn: false,
        on: "assets/site-img/Quote - Design (Pressed).png",
        off: "assets/site-img/Quote - Design.png"
    },
    "#video_b": {
        isOn: false,
        on: "assets/site-img/Quote - Video (Pressed).png",
        off: "assets/site-img/Quote - Video.png"
    },
    "#photo_b": {
        isOn: false,
        on: "assets/site-img/Quote - Photo (Pressed).png",
        off: "assets/site-img/Quote - Photo.png"
    },
    "#writing_b": {
        isOn: false,
        on: "assets/site-img/Quote - Writing (Pressed).png",
        off: "assets/site-img/Quote - Writing.png"
    },
    // DESIGN BUTTONS
    "#des_icon_b": {
        isOn: false,
        on: "assets/site-img/Quote/Design/Design - Icons (Pressed).png",
        off: "assets/site-img/Quote/Design/Design - Icons.png"
    },
    "#des_brand_b": {
        isOn: false,
        on: "assets/site-img/Quote/Design/Design - Logo (Pressed).png",
        off: "assets/site-img/Quote/Design/Design - Logo.png"
    },
    "#des_cl_b": {
        isOn: false,
        on: "assets/site-img/Quote/Design/Design - Concept (Pressed).png",
        off: "assets/site-img/Quote/Design/Design - Concept.png"
    },
    "#des_other_b": {
        isOn: false,
        on: "assets/site-img/Quote/Design/Design - Other (Pressed).png",
        off: "assets/site-img/Quote/Design/Design - Other.png"
    },
    // VIDEO BUTTONS
    "#vid_inter_b": {
        isOn: false,
        on: "assets/site-img/Quote/Video/Video - Interview (Pressed).png",
        off: "assets/site-img/Quote/Video/Video - Interview.png"
    },
    "#vid_prom_b": {
        isOn: false,
        on: "assets/site-img/Quote/Video/Video - Promotional (Pressed).png",
        off: "assets/site-img/Quote/Video/Video - Promotional.png"
    },
    "#vid_mv_b": {
        isOn: false,
        on: "assets/site-img/Quote/Video/Video - Music Video (Pressed).png",
        off: "assets/site-img/Quote/Video/Video - Music Video.png"
    },
    "#vid_sfilm_b": {
        isOn: false,
        on: "assets/site-img/Quote/Video/Video - Short Film (Pressed).png",
        off: "assets/site-img/Quote/Video/Video - Short Film.png"
    },
    "#vid_concp_b": {
        isOn: false,
        on: "assets/site-img/Quote/Video/Video - POC (Pressed).png",
        off: "assets/site-img/Quote/Video/Video - POC.png"
    },
    "#vid_other_b": {
        isOn: false,
        on: "assets/site-img/Quote/Video/Video - Other (Pressed).png",
        off: "assets/site-img/Quote/Video/Video - Other.png"
    },
    // PHOTO BUTTONS
    "#photo_head_b": {
        isOn: false,
        on: "assets/site-img/Quote/Photo/Photo - Headshots (Pressed).png",
        off: "assets/site-img/Quote/Photo/Photo - Headshots.png"
    },
    "#photo_events_b": {
        isOn: false,
        on: "assets/site-img/Quote/Photo/Photo - Events (Pressed).png",
        off: "assets/site-img/Quote/Photo/Photo - Events.png"
    },
    "#photo_other_b": {
        isOn: false,
        on: "assets/site-img/Quote/Photo/Photo - Other (Pressed).png",
        off: "assets/site-img/Quote/Photo/Photo - Other.png"
    },
    // WRITING BUTTONS
    "#writin_copyw_b": {
        isOn: false,
        on: "assets/site-img/Quote/Writing/Writing - Copy (Pressed).png",
        off: "assets/site-img/Quote/Writing/Writing - Copy.png"
    },
    "#writing_pr_b": {
        isOn: false,
        on: "assets/site-img/Quote/Writing/Writing - PR (Pressed).png",
        off: "assets/site-img/Quote/Writing/Writing - PR.png"
    },
    "#writing_other_b": {
        isOn: false,
        on: "assets/site-img/Quote/Writing/Writing - Other (Pressed).png",
        off: "assets/site-img/Quote/Writing/Writing - Other.png"
    }
}