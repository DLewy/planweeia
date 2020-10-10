/* ver. 1.2.1 06.10.2020 */

const timetableName = "plan-7air1.png";
const timetableDiffName = "diff-plan-7air1.png";
const timetableOldName = "plan-7air1_old.png";

function menuClick(id) {
    //Hide mobile menu if expanded
    /*document.getElementById("menu-btn").checked = false;*/
    document.getElementById("menu-btn").click();
    
    if (id != "tab4") {
        //Delete tab bg
        var tablink = document.querySelectorAll(".menu a");
        for (i = 0; i < tablink.length; i++) {
            tablink[i].style.removeProperty('background-color');
        }

        //Set bg color for selected tab
        document.getElementById(id).style.backgroundColor = "#ffffff49";
    }

    switch(id) {
        case "tab1":
            document.getElementById("timetable-img").src = timetableName;
            document.getElementById("content-img-download").href = timetableName;
            document.getElementById("content-img-download").setAttribute("download",cfl(timetableName));
           break;
        case "tab2":
            document.getElementById("timetable-img").src = timetableDiffName;
            document.getElementById("content-img-download").href = timetableDiffName;
            document.getElementById("content-img-download").setAttribute("download",cfl(timetableDiffName));
           break;
        case "tab3":
            document.getElementById("timetable-img").src = timetableOldName;
            document.getElementById("content-img-download").href = timetableOldName;
            document.getElementById("content-img-download").setAttribute("download",cfl(timetableOldName));
           break;
        case "tab4":
            document.getElementById("content-img-download").click();
            break;
    }
}

//Hide mobile menu, when clicked outside of it
function outsideMenuClick() {
    document.getElementById("menu-btn").click();
}

//Change timetable filename to upper case
function cfl(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//Reload page using Page Visibility API
function handleVisibilityChange() {
    if (document.visibilityState == "visible") {
        location.reload(true);
    }
}
document.addEventListener("visibilitychange", handleVisibilityChange, false);

window.onload = function() {
    document.getElementById("tab1").style.backgroundColor = "#ffffff49";
}