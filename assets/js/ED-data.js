var currentSelections = {
    form_id: null, 
    button_id: null,
    proj_button: null,
    open_buttons: null, 
    others: [], 
    form_data: [] 
};

 const pdfText = {
     // DESIGN
    "#des_icons": [
        "How many icons do you need?"
    ], 
    "#des_brand_logo": [
        "How many options would you like to see?",
        "Do you have a colour scheme in mind?",
        "Do you have any reference images to give us a sense of what you’re after?"
    ], 
    "#des_concept_layout": [
        "Please describe, as best you can, the kind of project you’re looking to pitch."
    ],
    "#design_other" : [
        "Please describe, as best you can, the kind of video project you have in mind.",
        "What is the estimated final length of the video you need?"
    ],

    // VIDEO
    "#video_form" : [
        "What is the estimated length of the video?",
        "Is this video part of a series?",
        "Do you have your shooting location(s)...",
        "Do you have a storyboard? (if you do not, would you like a storyboard developed?)",
        "Please let us know about any other details for your video project:"
    ],
    "#video_other" : [
        "Please describe, as best you can, the kind of video project you have in mind.",
        "What is the estimated final length of the video you need?"
    ],

    // PHOTO
    "#photo_head" : [
        "How many subjects need to be photographed?",
        "How many looks/options per subject would you like?",
        "Would you like simple lighting retouches or airbrushing on the final products?",
        "Would you like make up and wardrobe available at the shoot?",
        "Do you have a preferred shooting location?",
        "Do you require a studio setting?"
    ],
    "#photo_events" : [
        "What is the estimated number of final deliverables (photos, panoramas, etc.) you’re looking for?",
        "What is the duration of the event?",
        "What kind of event is it?",
        "What are the final deliverables you would like to receive?",
        "Would travel be required?"
    ],
    "#photo_other" : [
        "Please describe, as best you can, the kind of photo project you have in mind."
    ],

    // WRITING
    "#writing_copyw" : [
        "What kind of project do you have in mind?",
        "What is the estimated final length of the script you need?"
    ],
    "#writing_pr" : [
        "Which of the following media relations opportunities are you interested in?",
        "Which of the following do you require?"
    ],
    "#writing_other" : [
        "Please describe, as best you can, the kind of photo project you have in mind."
    ]
};

// BUTTON SOURCES
var btnInfo = {
    // MAIN BUTTONS
    "#design_b" : {
        isOn: false,
        on: "assets/site-img/Quote - Design (Pressed).png",
        off: "assets/site-img/Quote - Design.png"
    },
    "#video_b" : {
        isOn: false,
        on: "assets/site-img/Quote - Video (Pressed).png",
        off: "assets/site-img/Quote - Video.png"
    },
    "#photo_b" : {
        isOn: false,
        on: "assets/site-img/Quote - Photo (Pressed).png",
        off: "assets/site-img/Quote - Photo.png"
    },
    "#writing_b" : {
        isOn: false,
        on: "assets/site-img/Quote - Writing (Pressed).png",
        off: "assets/site-img/Quote - Writing.png"
    },
    // DESIGN BUTTONS
    "#des_icon_b" : {
        isOn: false,
        on: "assets/site-img/Quote/Design/Design - Icons (Pressed).png",
        off: "assets/site-img/Quote/Design/Design - Icons.png"
    },
    "#des_brand_b" : {
        isOn: false,
        on: "assets/site-img/Quote/Design/Design - Logo (Pressed).png",
        off: "assets/site-img/Quote/Design/Design - Logo.png"
    },
    "#des_cl_b" : {
        isOn: false,
        on: "assets/site-img/Quote/Design/Design - Concept (Pressed).png",
        off: "assets/site-img/Quote/Design/Design - Concept.png"
    },
    "#des_other_b" : {
        isOn: false,
        on: "assets/site-img/Quote/Design/Design - Other (Pressed).png",
        off: "assets/site-img/Quote/Design/Design - Other.png"
    },
    // VIDEO BUTTONS
    "#vid_inter_b" : {
        isOn: false,
        on: "assets/site-img/Quote/Video/Video - Interview (Pressed).png",
        off: "assets/site-img/Quote/Video/Video - Interview.png"
    },
    "#vid_prom_b" : {
        isOn: false,
        on: "assets/site-img/Quote/Video/Video - Promotional (Pressed).png",
        off: "assets/site-img/Quote/Video/Video - Promotional.png"
    },
    "#vid_mv_b" : {
        isOn: false,
        on: "assets/site-img/Quote/Video/Video - Music Video (Pressed).png",
        off: "assets/site-img/Quote/Video/Video - Music Video.png"
    },
    "#vid_sfilm_b" : {
        isOn: false,
        on: "assets/site-img/Quote/Video/Video - Short Film (Pressed).png",
        off: "assets/site-img/Quote/Video/Video - Short Film.png"
    },
    "#vid_concp_b" : {
        isOn: false,
        on: "assets/site-img/Quote/Video/Video - POC (Pressed).png",
        off: "assets/site-img/Quote/Video/Video - POC.png"
    },
    "#vid_other_b" : {
        isOn: false,
        on: "assets/site-img/Quote/Video/Video - Other (Pressed).png",
        off: "assets/site-img/Quote/Video/Video - Other.png"
    },
    // PHOTO BUTTONS
    "#photo_head_b" : {
        isOn: false,
        on: "assets/site-img/Quote/Photo/Photo - Headshots (Pressed).png",
        off: "assets/site-img/Quote/Photo/Photo - Headshots.png"
    },
    "#photo_events_b" : {
        isOn: false,
        on: "assets/site-img/Quote/Photo/Photo - Events (Pressed).png",
        off: "assets/site-img/Quote/Photo/Photo - Events.png"
    },
    "#photo_other_b" : {
        isOn: false,
        on: "assets/site-img/Quote/Photo/Photo - Other (Pressed).png",
        off: "assets/site-img/Quote/Photo/Photo - Other.png"
    },
    // WRITING BUTTONS
    "#writin_copyw_b" : {
        isOn: false,
        on: "assets/site-img/Quote/Writing/Writing - Copy (Pressed).png",
        off: "assets/site-img/Quote/Writing/Writing - Copy.png"
    },
    "#writing_pr_b" : {
        isOn: false,
        on: "assets/site-img/Quote/Writing/Writing - PR (Pressed).png",
        off: "assets/site-img/Quote/Writing/Writing - PR.png"
    },
    "#writing_other_b" : {
        isOn: false,
        on: "assets/site-img/Quote/Writing/Writing - Other (Pressed).png",
        off: "assets/site-img/Quote/Writing/Writing - Other.png"
    }
}