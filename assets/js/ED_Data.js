"use strict";
class ED_Data {
    form_id = null;
    button_id = null;
    proj_button = null;
    open_buttons = null;
    others = [];
    answers = { 0: null, 1: null, 2: null, 3: null, 4: null, 5: null };
    name = null;
    email = null;
    attachment = null;    
    btnInfo = {
        "#design_b": {
            isOn: false,
            on: "assets/site-img/Quote/Quote - Design (Pressed).png",
            off: "assets/site-img/Quote/Quote - Design.png"
        },
        "#video_b": {
            isOn: false,
            on: "assets/site-img/Quote/Quote - Video (Pressed).png",
            off: "assets/site-img/Quote/Quote - Video.png"
        },
        "#photo_b": {
            isOn: false,
            on: "assets/site-img/Quote/Quote - Photo (Pressed).png",
            off: "assets/site-img/Quote/Quote - Photo.png"
        },
        "#writing_b": {
            isOn: false,
            on: "assets/site-img/Quote/Quote - Writing (Pressed).png",
            off: "assets/site-img/Quote/Quote - Writing.png"
        },
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
    };
    pdfText = {
        "#des_icons": {
            0: ["- How many icons do you need?", this.answers[0]],
            1: ["- Please describe what kind of icon set you will need (visual theme, what they will be used for, etc).", this.answers[1]]
        },
        "#des_brand_logo": {
            0: ["- How many options would you like to see?", this.answers[0]],
            1: ["- Do you have a colour scheme in mind?", this.answers[1]],
            2: ["- Do you have any reference images to give us a sense of what you're after?", this.answers[2]]
        },
        "#des_concept_layout": {
            0: ["- Please describe, as best you can, the kind of project you're looking to pitch.", this.answers[0]]
        },
        "#design_other": {
            0: ["- Please describe, as best you can, the kind of illustration/design project you have in mind.", this.answers[0]]
        },
        "#video_form": {
            0: ["- What is the estimated length of the video?", this.answers[0]],
            1: ["- Is this video part of a series?", this.answers[1]],
            2: ["- Do you have your shooting location(s)...", this.answers[2], this.answers[3]],
            3: ["- Do you have a storyboard? (if you do not, would you like a storyboard developed?)", this.answers[4], this.answers[5]],
            4: ["- Please let us know about any other details for your video project:", this.answers[6]]
        },
        "#video_other": {
            0: ["- Please describe, as best you can, the kind of video project you have in mind.", this.answers[0]],
            1: ["- What is the estimated final length of the video you need?", this.answers[1]]
        },
        "#photo_head": {
            0: ["- How many subjects need to be photographed?", this.answers[0]],
            1: ["- How many looks/options per subject would you like?", this.answers[1]],
            2: ["- Would you like simple lighting retouches or airbrushing on the final products?", this.answers[2]],
            3: ["- Would you like make up and wardrobe available at the shoot?", this.answers[3]],
            4: ["- Do you have a preferred shooting location?", this.answers[4]],
            5: ["- Do you require a studio setting?", this.answers[5]]
        },
        "#photo_events": {
            0: ["- What is the estimated number of final deliverables (photos, panoramas, etc.) you're looking for?", this.answers[0]],
            1: ["- What is the duration of the event?", this.answers[1]],
            2: ["- What kind of event is it?", this.answers[2], this.answers[3]],
            3: ["- What are the final deliverables you would like to receive?", this.answers[4]],
            4: ["- Would travel be required?", this.answers[5]]
        },
        "#photo_other": {
            0: ["- Please describe, as best you can, the kind of photo project you have in mind.", this.answers[0]]
        },
        "#writing_copyw": {
            0: ["- What kind of project do you have in mind?", this.answers[0]],
            1: ["- What is the estimated final length of the script you need?", this.answers[1]]
        },
        "#writing_pr": {
            0: ["- Which of the following media relations opportunities are you interested in?", this.answers[0], this.answers[1]],
            1: ["- Which of the following do you require?", this.answers[2], this.answers[3]]
        },
        "#writing_other": {
            0: ["- Please describe, as best you can, the kind of photo project you have in mind.", this.answers[0]]
        }
    };
}
