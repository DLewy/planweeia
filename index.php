<?php
error_reporting(0);
ini_set('display_errors', 0);

if($_SERVER['REMOTE_ADDR']!="89.71.30.90") {
	$xml = simplexml_load_file("http://www.geoplugin.net/xml.gp?ip=".$_SERVER['REMOTE_ADDR']);
	$countryname = $xml->geoplugin_countryName;
	$cityname = $xml->geoplugin_city;
	$continentCode = $xml->geoplugin_continentCode;


	$line = date('Y-m-d H:i:s')." - ".$_SERVER['REMOTE_ADDR']."->".$continentCode."->".$countryname."->".$cityname." - ".$_SERVER['HTTP_REFERER'];
	file_put_contents('../../logs/weeia.log', $line . PHP_EOL, FILE_APPEND);
}
?>

<!-- Copyright © 2021 Lewy. All rights reserved -->
<!-- ver. 1.5.0 18.03.2021 -->

<!DOCTYPE html>
<html lang="pl">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="theme-color" content="#860b0d">
        <meta name="description" content="Plan WEEIA">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <title>Plan WEEIA</title>
        <link rel="icon" href="weeia_logo.png">
        <link rel="stylesheet" href="planweeia.css?v=1.5.0">
        <link rel="stylesheet" href="BeerSlider.css?v=1.0.1">
        <link rel="manifest" href="manifest.webmanifest?v=1.0.1">
        <link rel="apple-touch-icon" href="appicon-maskable-192.png">
        <script src="planweeia.js?v=1.5.0" defer></script>
        <script src="BeerSlider.js?v=1.0.0" defer></script>
    </head>

    <body>
        <header>
            <div class="logo"><a href="http://www.weeia.p.lodz.pl/"><img class="logo-icon" src="weeia_logo.png" alt="logo"></a></div>
            <p class="title">Plan ET AiM</p>
            <input class="menu-btn" id="menu-btn" type="checkbox"/>
            <label class="menu-icon" for="menu-btn"><div class="nav-icon-container"><div class="nav-icon"></div></div></label>
            <ul class="menu">
                <li><a id="tab1" onclick="menuClick(this.id)">Plan</a></li
                ><li><a id="tab2" onclick="menuClick(this.id)">Zmiany</a></li
                ><li><a class="tab3" id="tab3-beer" onclick="menuClick(this.id)">Porównanie</a></li
                ><li><a id="tab4" onclick="menuClick(this.id)">Terminy</a></li
                ><li><a id="tab5" onclick="menuClick(this.id)">Newsletter</a></li
                ><li><a id="tab6" onclick="menuClick(this.id)">Pobierz</a></li>
            </ul>
            <div id="menu-bg-overlay" onclick="outsideMenuClick()"></div>
            <script>
                //Change tab3 name and id
                if (window.matchMedia("(max-width: 900px)").matches) {
                    document.querySelector(".tab3").innerHTML = "Stary Plan";
                    document.querySelector(".tab3").id = "tab3-old";
                }
            </script>
        </header>

        <div class="tabcontent" id="Timetable">
            <img id="timetable-img" src="plan-1et-aim.png?t=<?php echo filemtime("plan-1et-aim.png"); ?>" alt="Plan">
        </div>
        <div class="tabcontent" id="Diff">
            <img id="timetable-img" src="diff-plan-1et-aim.png?t=<?php echo filemtime("diff-plan-1et-aim.png"); ?>" alt="Plan Diff">
        </div>
        <div class="tabcontent" id="Beer">
            <div id="beer-slider" class="beer-slider" data-beer-label="">
                <img id="timetable-img" src="plan-1et-aim_old.png?t=<?php echo filemtime("plan-1et-aim_old.png"); ?>" alt="Plan Old">
                <div class="beer-reveal" data-beer-label="">
                    <img id="timetable-img" src="plan-1et-aim.png?t=<?php echo filemtime("plan-1et-aim.png"); ?>" alt="Plan">
                </div>
            </div>
        </div>
        <div class="tabcontent" id="Old">
            <img id="timetable-img" src="plan-1et-aim_old.png?t=<?php echo filemtime("plan-1et-aim_old.png"); ?>" alt="Plan Old">
        </div>
        <div class="tabcontent" id="Terms">
            <img id="terms-img" src="terminy.png?t=<?php echo filemtime("terminy.png"); ?>" alt="Terminy">
        </div>
        <a id="tabcontent-img-download" href="plan-1et-aim.png" download="plan-1et-aim.png">Pobierz</a>
        <!-- <a id="tabcontent-img-download" href="plan-1et-aim.png" download>Pobierz</a> -->
    </body>
</html>