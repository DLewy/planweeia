<?php
header('Content-type: image/png');
$error = false;
$zmiana_dnia = [0 => "", 1 => "poniedzialek", 2 => "wtorek", 3 => "sroda", 4 => "czwartek", 5 => "piatek"];
$json_file = file_get_contents("timetable.json");
if ($json_file === false) {
		$error = true;
} else {
		$json = json_decode($json_file, true);
		if ($json === null) {
				$error = true;
		} else {
			$today = $json[date('z') + 1];
			if ($today === null) {
				$text = "";
			} else {
				$text = "Tydzien ".(string)$today[0];
				if ($today[1] == 0) {
						$text = $text.", nieparzyste.";
				} else {
						$text = $text.", parzyste.";
				}
				if ($today[2] != 0) {
						$text = $text." Dzis plan za ".$zmiana_dnia[$today[2]]."!";
				}
			}
		}
}
if ($error == true) {
		$png_image = imagecreatefrompng('error.png');

} else {
		$png_image = imagecreatefrompng('plan-et-aim.png');
		$black = imagecolorallocate($png_image, 0, 0, 0);
		$bbox = imagettfbbox(50, 0, 'Lato-Regular', $text);
		$imgdata = getimagesize('plan-et-aim.png');
		imagettftext($png_image,50, 0, $imgdata[0]-($bbox[2]+30), 65, $black,'Lato-Regular',$text);
}
imagepng($png_image);
imagedestroy($png_image);
?>
