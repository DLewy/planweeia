/* ver. 1.4.2 15.03.2021 */

const timetableName = "plan-1et-aim.png";
const timetableDiffName = "diff-plan-1et-aim.png";
const timetableOldName = "plan-1et-aim_old.png";
const termsName = "terminy.png";
const autoReloadTimeout = 60;    //minutes

function menuClick(id) {
    //Hide mobile menu if expanded
    document.getElementById("menu-btn").checked = false;
    //document.getElementById("menu-btn").click();
    
    if (id != "tab5" && id != "tab6") {
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
            document.getElementById("tabcontent-img-download").setAttribute("download", timetableName);
           break;
        case "tab2":
            document.getElementById("Diff").style.display = "block";
            document.getElementById("tabcontent-img-download").href = timetableDiffName;
            document.getElementById("tabcontent-img-download").setAttribute("download", timetableDiffName);
           break;
        case "tab3-beer":
            document.getElementById("Beer").style.display = "block";
            new BeerSlider(document.getElementById("beer-slider"));
            document.getElementById("tabcontent-img-download").href = timetableOldName;
            document.getElementById("tabcontent-img-download").setAttribute("download", timetableOldName);
           break;
        case "tab3-old":
            document.getElementById("Old").style.display = "block";
            document.getElementById("tabcontent-img-download").href = timetableOldName;
            document.getElementById("tabcontent-img-download").setAttribute("download", timetableOldName);
            break;
        case "tab4":
            document.getElementById("Terms").style.display = "block";
            document.getElementById("tabcontent-img-download").href = termsName;
            document.getElementById("tabcontent-img-download").setAttribute("download", termsName);
            break;
        case "tab5":
            window.open("/inputform.php", "_top");
            break;
        case "tab6":
            document.getElementById("tabcontent-img-download").click();
            break;
    }
}

//Hide mobile menu, when clicked outside of it
function outsideMenuClick() {
    document.getElementById("menu-btn").click();
}

//Change tab3 name and content when width is changing
window.matchMedia("(max-width: 900px)").addEventListener("change", tab3Change);
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

//Auto reload page using Page Visibility API
document.addEventListener("visibilitychange", handleVisibilityChange, false);
function handleVisibilityChange() {
    if (Date.now() - sessionStorage.getItem("timestamp") < autoReloadTimeout*60*1000) return;   //reload only if timeout less than ...
    if (document.visibilityState == "visible") location.reload();
}

window.addEventListener('load', () => {
    //restore opened tab from last session (before refresh)
    var id = sessionStorage.getItem("tabId");
    if (id && id != "tab1") {
        menuClick(id);
    }
    else {  //default tab
        document.getElementById("tab1").style.backgroundColor = "#ffffff49";
        document.getElementById("Timetable").style.display = "block";
    }
    //Save timestamp
    sessionStorage.setItem("timestamp", Date.now());
});

//Set css --vh variable (bugfix for vh in mobile browser. Set vh as window height without url bar)
window.addEventListener('resize', viewHeight);
window.addEventListener('orientationchange', viewHeight);
viewHeight();

function viewHeight() {
    document.documentElement.style.setProperty('--vh', (window.innerHeight/100) + 'px');
}

//Service worker
if('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(reg) {
                console.log('Service worker registered');
                if(reg.installing) {
                    console.log('Service worker installing');
                } else if(reg.waiting) {
                    console.log('Service worker installed');
                } else if(reg.active) {
                    console.log('Service worker active');
                }
            }).catch(function(err) {
                console.log('Service worker registration failed with:', err);
            });
    });
} else {
    console.log('Service worker unsupported');
}
