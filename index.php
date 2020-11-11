<?php
if($_SERVER['REMOTE_ADDR']!="89.71.30.90") {
	$xml = simplexml_load_file("http://www.geoplugin.net/xml.gp?ip=".$_SERVER['REMOTE_ADDR']);
	$countryname = $xml->geoplugin_countryName;
	$cityname = $xml->geoplugin_city;
	$continentCode = $xml->geoplugin_continentCode;


	$line = date('Y-m-d H:i:s')." - ".$_SERVER['REMOTE_ADDR']."->".$continentCode."->".$countryname."->".$cityname." - ".$_SERVER['HTTP_REFERER'];
	file_put_contents('../../logs/weeia.log', $line . PHP_EOL, FILE_APPEND);
}
?>


<!-- Copyright © 2020 Lewy. All rights reserved -->
<!-- ver. 1.4.0 11.11.2020 -->

<!DOCTYPE html>
<html lang="pl">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="theme-color" content="#860b0d">
        <title>Plan AiR</title>
        <link rel="icon" href="weeia_logo.png">
        <link rel="stylesheet" href="planair.css?v=1.4.0">
        <link rel="stylesheet" href="BeerSlider.css?v=1.0.1">
        <link rel="manifest" href="manifest.webmanifest?v=1.0">
        <script src="planair.js?v=1.3.3"></script>
        <script src="BeerSlider.js?v=1.0"></script>
    </head>

    <body>
        <header>
            <div class="logo"><a href="http://www.weeia.p.lodz.pl/"><img src="weeia_logo.png" alt="logo"></a></div>
            <p class="title">Plan AIR1</p>
            <input class="menu-btn" type="checkbox" id="menu-btn"/>
            <label class="menu-icon" for="menu-btn"><div class="nav-icon-container"><div class="nav-icon"></div></div></label>
            <ul class="menu" id="test">
                <li><a id="tab1" onclick="menuClick(this.id)">Plan</a></li
                ><li><a id="tab2" onclick="menuClick(this.id)">Zmiany</a></li
                ><li><a class="tab3" id="tab3-beer" onclick="menuClick(this.id)">Porównanie</a></li
                ><li><a id="tab4" onclick="menuClick(this.id)">Terminy</a></li
                ><li><a id="tab5" onclick="menuClick(this.id)">Pobierz</a></li>
            </ul>
            <div class="menu-bg-overlay" onclick="outsideMenuClick()"></div>
            <script>
                //Change tab3 name and id
                //if ((/Mobile/.test(navigator.userAgent) || window.matchMedia("(max-width: 39rem)").matches)
                if (window.matchMedia("(max-width: 39rem)").matches) {
                    document.querySelector(".tab3").innerHTML = "Stary Plan";
                    document.querySelector(".tab3").id = "tab3-old";
                }
            </script>
        </header>

        <div class="tabcontent" id="Timetable">
            <img id="timetable-img" src="plan-7air1.png?t=<?php echo filemtime("plan-7air1.png"); ?>" alt="Plan">
        </div>
        <div class="tabcontent" id="Diff">
            <img id="timetable-img" src="diff-plan-7air1.png?t=<?php echo filemtime("diff-plan-7air1.png"); ?>" alt="Plan Diff">
        </div>
        <div class="tabcontent" id="Beer">
            <div id="beer-slider" class="beer-slider" data-beer-label="">
                <img id="timetable-img" src="plan-7air1_old.png?t=<?php echo filemtime("plan-7air1_old.png"); ?>" alt="Plan Old">
                <div class="beer-reveal" data-beer-label="">
                    <img id="timetable-img" src="plan-7air1.png?t=<?php echo filemtime("plan-7air1.png"); ?>" alt="Plan">
                </div>
            </div>
        </div>
        <div class="tabcontent" id="Old">
            <img id="timetable-img" src="plan-7air1_old.png?t=<?php echo filemtime("plan-7air1_old.png"); ?>" alt="Plan Old">
        </div>

        <div class="tabcontent" id="Terms">
            <img id="terms-img" src="terminy.png?t=<?php echo filemtime("terminy.png"); ?>" alt="Terminy">
        </div>

        <a id="tabcontent-img-download" href="plan-7air1.png" download="Plan-7air1.png">Pobierz</a>
        <!-- <a id="tabcontent-img-download" href="plan-7air1.png" download>Pobierz</a> -->
    </body>
</html>