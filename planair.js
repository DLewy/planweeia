/* ver. 1.3 10.10.2020 */

const timetableName = "plan-7air1.png";
const timetableDiffName = "diff-plan-7air1.png";
const timetableOldName = "plan-7air1_old.png";
const termsName = "terminy.png";

function menuClick(id) {
    //Hide mobile menu if expanded
    document.getElementById("menu-btn").checked = false;
    //document.getElementById("menu-btn").click();
    
    if (id != "tab5") {
        //save to session storage
        sessionStorage.setItem("tabId",id);

        //Hide tab content
        var tabcontent = document.querySelectorAll(".tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

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
            document.getElementById("Timetable").style.display = "block";
            document.getElementById("tabcontent-img-download").href = timetableName;
            document.getElementById("tabcontent-img-download").setAttribute("download",cfl(timetableName));
           break;
        case "tab2":
            document.getElementById("Diff").style.display = "block";
            document.getElementById("tabcontent-img-download").href = timetableDiffName;
            document.getElementById("tabcontent-img-download").setAttribute("download",cfl(timetableDiffName));
           break;
        case "tab3-beer":
            document.getElementById("Beer").style.display = "block";
            new BeerSlider(document.getElementById("beer-slider"));
            document.getElementById("tabcontent-img-download").href = timetableOldName;
            document.getElementById("tabcontent-img-download").setAttribute("download",cfl(timetableOldName));
           break;
        case "tab3-old":
            document.getElementById("Old").style.display = "block";
            document.getElementById("tabcontent-img-download").href = timetableOldName;
            document.getElementById("tabcontent-img-download").setAttribute("download",cfl(timetableOldName));
            break;
        case "tab4":
            document.getElementById("Terms").style.display = "block";
            document.getElementById("tabcontent-img-download").href = termsName;
            document.getElementById("tabcontent-img-download").setAttribute("download",cfl(termsName));
            break;       
        case "tab5":
            document.getElementById("tabcontent-img-download").click();
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

//Change tab3 name and content when width is changing
function tab3Change(e) {
    var id = sessionStorage.getItem("tabId");
 
    if (e.matches) {
        document.querySelector(".tab3").innerHTML = "Stary Plan";
        document.querySelector(".tab3").id = "tab3-old";
        if (id =="tab3-beer") menuClick("tab3-old");
    }
    else {
        document.querySelector(".tab3").innerHTML = "Porównanie";
        document.querySelector(".tab3").id = "tab3-beer";
        if (id == "tab3-old") menuClick("tab3-beer");
    }
    
}
window.matchMedia("(max-width: 39rem)").addListener(tab3Change);

//Auto reload page using Page Visibility API
function handleVisibilityChange() {
    if (document.visibilityState == "visible") {
        location.reload(true);
    }
}
document.addEventListener("visibilitychange", handleVisibilityChange, false);

window.onload = function() {
    //restore opened tab from last session (before refresh)
    var id = sessionStorage.getItem("tabId");
    if (id) {
        menuClick(id);
    }
}