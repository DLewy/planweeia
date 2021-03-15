<!-- Copyright © 2020 Lewy. All rights reserved -->
<!-- ver. 1.0.0 -->

<?php
    $host = "localhost";
    $db_user = "root";
    $db_password = "";
    $db_name = "newsletter";

    session_start();
    if (isset($_POST['email']))
    {
        mysqli_report(MYSQLI_REPORT_STRICT);
        try
        {
            $connection = new mysqli($host, $db_user, $db_password, $db_name);
            if (connection->connect_errno != 0)
            {
                throw new Exception(mysqli_connect_errno());
            }
        }
        catch (Exception $err)
        {
            echo $err;
        }
        
    }
    else 
    {
        //Check if email exist
        $out = $connection->query("SELECT id FROM newsletter WHERE email='$email'");
        if (!$out) throw new Exception($connection->error);
        if ($out->num_rows > 0)
        {
            $ok = false;
            $_SESSION['e_email'] = "Taki adres e-mail już istnieje!";
        }

        $connection->close();
    }
?>

<!DOCTYPE HTML>
<html lang="pl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Type" content="text/html">
        <meta name="theme-color" content="#860b0d">
        <title>Plan WEEIA Newsletter</title>
        <link rel="icon" href="weeia_logo.png">
        <link rel="stylesheet" href="inputform.css">
    </head>
    <body>
        <?php
            $fname = $_POST['fname'];
            $email = $_POST['email'];
            $ip = $_SERVER['REMOTE_ADDR'];
            $date = date('Y-m-d H:i:s');

            echo "<h1>Zostałeś zapisany!</h1>";
        ?>
    </body>
</html>