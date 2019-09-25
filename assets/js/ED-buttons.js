jQuery(function($) {
    var $nav = $('#floating_btn');
    var $win = $(window);
    var winH = $win.height();   // Get the window height.

    $win.on("scroll", function () {
        $nav.toggleClass("c_hide", $(this).scrollTop() < winH );
    }).on("resize", function(){ // If the user resizes the window
       winH = $(this).height(); // you'll need the new height value
    });
});

function scroll_to(id) {
    if(id == "top") {
        $("html, body").animate({
            scrollTop: 0
        }, 1000);
    } else {
        $("html, body").animate({
            scrollTop: $(id).offset().top
        }, 1000);
    }
}

// -------------------------------- IMG HOVER FUCNTIONS -------------------------------------
// INDEX SECTION ----------------------------------
// QUOTE BUTTON
$("#quote-card").hover(function () {
    $("#quote-card").attr("src", "assets/site-img/Splash/Splash - Quote (Pressed).png");
}, function () {
    $("#quote-card").attr("src", "assets/site-img/Splash/Splash - Quote.png");
});
// STUFF BUTTON
$("#stuff-card").hover(function () {
    $("#stuff-card").attr("src", "assets/site-img/Splash/Splash - Work (Pressed).png");
}, function () {
    $("#stuff-card").attr("src", "assets/site-img/Splash/Splash - Work.png");
});

// QUOTE SECTION ----------------------------------
// DESIGN
$("#design_b").hover(function () {
    if (!(ed_data.btnInfo["#design_b"].isOn)) {
        $("#design_b").attr("src", ed_data.btnInfo["#design_b"].on);
    }
}, function () {
    if (!(ed_data.btnInfo["#design_b"].isOn)) {
        $("#design_b").attr("src", ed_data.btnInfo["#design_b"].off);
    }
});
    // DESIGN/ICONS
    $("#des_icon_b").hover(function () {
        if (!(ed_data.btnInfo["#des_icon_b"].isOn)) {
            $("#des_icon_b").attr("src", ed_data.btnInfo["#des_icon_b"].on);
        }
    }, function () {
        if (!(ed_data.btnInfo["#des_icon_b"].isOn)) {
            $("#des_icon_b").attr("src", ed_data.btnInfo["#des_icon_b"].off);
        }
    });
    // DESIGN/LOGO
    $("#des_brand_b").hover(function () {
        if (!(ed_data.btnInfo["#des_brand_b"].isOn)) {
            $("#des_brand_b").attr("src", ed_data.btnInfo["#des_brand_b"].on);
        }
    }, function () {
        if (!(ed_data.btnInfo["#des_brand_b"].isOn)) {
            $("#des_brand_b").attr("src", ed_data.btnInfo["#des_brand_b"].off);
        }
    });
    // DESIGN/CONCEPT
    $("#des_cl_b").hover(function () {
        if (!(ed_data.btnInfo["#des_cl_b"].isOn)) {
            $("#des_cl_b").attr("src", ed_data.btnInfo["#des_cl_b"].on);
        }
    }, function () {
        if (!(ed_data.btnInfo["#des_cl_b"].isOn)) {
            $("#des_cl_b").attr("src", ed_data.btnInfo["#des_cl_b"].off);
        }
    });
    // DESIGN/OTHER
    $("#des_other_b").hover(function () {
        if (!(ed_data.btnInfo["#des_other_b"].isOn)) {
            $("#des_other_b").attr("src", ed_data.btnInfo["#des_other_b"].on);
        }
    }, function () {
        if (!(ed_data.btnInfo["#des_other_b"].isOn)) {
            $("#des_other_b").attr("src", ed_data.btnInfo["#des_other_b"].off);
        }
    });

// VIDEO
$("#video_b").hover(function () {
    if (!(ed_data.btnInfo["#video_b"].isOn)) {
        $("#video_b").attr("src", ed_data.btnInfo["#video_b"].on);
    }
}, function () {
    if (!(ed_data.btnInfo["#video_b"].isOn)) {
        $("#video_b").attr("src", ed_data.btnInfo["#video_b"].off);
    }
});
    // VIDEO/INTERVIEW
    $("#vid_inter_b").hover(function () {
        if (!(ed_data.btnInfo["#vid_inter_b"].isOn)) {
            $("#vid_inter_b").attr("src", ed_data.btnInfo["#vid_inter_b"].on);
        }
    }, function () {
        if (!(ed_data.btnInfo["#vid_inter_b"].isOn)) {
            $("#vid_inter_b").attr("src", ed_data.btnInfo["#vid_inter_b"].off);
        }
    });
    // VIDEO/PROMOTIONAL
    $("#vid_prom_b").hover(function () {
        if (!(ed_data.btnInfo["#vid_prom_b"].isOn)) {
            $("#vid_prom_b").attr("src", ed_data.btnInfo["#vid_prom_b"].on);
        }
    }, function () {
        if (!(ed_data.btnInfo["#vid_prom_b"].isOn)) {
            $("#vid_prom_b").attr("src", ed_data.btnInfo["#vid_prom_b"].off);
        }
    });
    // VIDEO/MUSIC VIDEO
    $("#vid_mv_b").hover(function () {
        if (!(ed_data.btnInfo["#vid_mv_b"].isOn)) {
            $("#vid_mv_b").attr("src", ed_data.btnInfo["#vid_mv_b"].on);
        }
    }, function () {
        if (!(ed_data.btnInfo["#vid_mv_b"].isOn)) {
            $("#vid_mv_b").attr("src", ed_data.btnInfo["#vid_mv_b"].off);
        }
    });
    // VIDEO/SHORT FILM
    $("#vid_sfilm_b").hover(function () {
        if (!(ed_data.btnInfo["#vid_sfilm_b"].isOn)) {
            $("#vid_sfilm_b").attr("src", ed_data.btnInfo["#vid_sfilm_b"].on);
        }
    }, function () {
        if (!(ed_data.btnInfo["#vid_sfilm_b"].isOn)) {
            $("#vid_sfilm_b").attr("src", ed_data.btnInfo["#vid_sfilm_b"].off);
        }
    });
    // VIDEO/PROOF OF CONCEPT
    $("#vid_concp_b").hover(function () {
        if (!(ed_data.btnInfo["#vid_concp_b"].isOn)) {
            $("#vid_concp_b").attr("src", ed_data.btnInfo["#vid_concp_b"].on);
        }
    }, function () {
        if (!(ed_data.btnInfo["#vid_concp_b"].isOn)) {
            $("#vid_concp_b").attr("src", ed_data.btnInfo["#vid_concp_b"].off);
        }
    });
    // VIDEO/OTHER
    $("#vid_other_b").hover(function () {
        if (!(ed_data.btnInfo["#vid_other_b"].isOn)) {
            $("#vid_other_b").attr("src", ed_data.btnInfo["#vid_other_b"].on);
        }
    }, function () {
        if (!(ed_data.btnInfo["#vid_other_b"].isOn)) {
            $("#vid_other_b").attr("src", ed_data.btnInfo["#vid_other_b"].off);
        }
    });

// PHOTO
$("#photo_b").hover(function () {
    if (!(ed_data.btnInfo["#photo_b"].isOn)) {
        $("#photo_b").attr("src", ed_data.btnInfo["#photo_b"].on);
    }
}, function () {
    if (!(ed_data.btnInfo["#photo_b"].isOn)) {
        $("#photo_b").attr("src", ed_data.btnInfo["#photo_b"].off);
    }
});
    // PHOTO/HEADSHOTS
    $("#photo_head_b").hover(function () {
        if (!(ed_data.btnInfo["#photo_head_b"].isOn)) {
            $("#photo_head_b").attr("src", ed_data.btnInfo["#photo_head_b"].on);
        }
    }, function () {
        if (!(ed_data.btnInfo["#photo_head_b"].isOn)) {
            $("#photo_head_b").attr("src", ed_data.btnInfo["#photo_head_b"].off);
        }
    });
    // PHOTO/EVENTS
    $("#photo_events_b").hover(function () {
        if (!(ed_data.btnInfo["#photo_events_b"].isOn)) {
            $("#photo_events_b").attr("src", ed_data.btnInfo["#photo_events_b"].on);
        }
    }, function () {
        if (!(ed_data.btnInfo["#photo_events_b"].isOn)) {
            $("#photo_events_b").attr("src", ed_data.btnInfo["#photo_events_b"].off);
        }
    });
    // PHOTO/OTHER
    $("#photo_other_b").hover(function () {
        if (!(ed_data.btnInfo["#photo_other_b"].isOn)) {
            $("#photo_other_b").attr("src", ed_data.btnInfo["#photo_other_b"].on);
        }
    }, function () {
        if (!(ed_data.btnInfo["#photo_other_b"].isOn)) {
            $("#photo_other_b").attr("src", ed_data.btnInfo["#photo_other_b"].off);
        }
    });

// WRITING
$("#writing_b").hover(function () {
    if (!(ed_data.btnInfo["#writing_b"].isOn)) {
        $("#writing_b").attr("src", ed_data.btnInfo["#writing_b"].on);
    }
}, function () {
    if (!(ed_data.btnInfo["#writing_b"].isOn)) {
        $("#writing_b").attr("src", ed_data.btnInfo["#writing_b"].off);
    }
});
    // WRITING/COPYWRITING
    $("#writin_copyw_b").hover(function () {
        if (!(ed_data.btnInfo["#writin_copyw_b"].isOn)) {
            $("#writin_copyw_b").attr("src", ed_data.btnInfo["#writin_copyw_b"].on);
        }
    }, function () {
        if (!(ed_data.btnInfo["#writin_copyw_b"].isOn)) {
            $("#writin_copyw_b").attr("src", ed_data.btnInfo["#writin_copyw_b"].off);
        }
    });
    // WRITING/PUBLIC RELATIONS
    $("#writing_pr_b").hover(function () {
        if (!(ed_data.btnInfo["#writing_pr_b"].isOn)) {
            $("#writing_pr_b").attr("src", ed_data.btnInfo["#writing_pr_b"].on);
        }
    }, function () {
        if (!(ed_data.btnInfo["#writing_pr_b"].isOn)) {
            $("#writing_pr_b").attr("src", ed_data.btnInfo["#writing_pr_b"].off);
        }
    });
    // WRITING/OTHER
    $("#writing_other_b").hover(function () {
        if (!(ed_data.btnInfo["#writing_other_b"].isOn)) {
            $("#writing_other_b").attr("src", ed_data.btnInfo["#writing_other_b"].on);
        }
    }, function () {
        if (!(ed_data.btnInfo["#writing_other_b"].isOn)) {
            $("#writing_other_b").attr("src", ed_data.btnInfo["#writing_other_b"].off);
        }
    });