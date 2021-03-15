<!-- Copyright © 2021 Lewy. All rights reserved -->
<!-- ver. 1.0.0 -->

<!DOCTYPE html>
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
  <div class="overlay">
      <style>
        .overlay {
          color: red;
          font-size: 2rem;
          font-weight: bold;
          -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
          align-items: top;
          display: flex;
          justify-content: center;
          height: 100%;
          width: 100%;
          z-index: 2;
          position: fixed;
          top: 0;
          left: 0;

          xdisplay: none;
        }
      </style>
      <p>Strona w trakcie budowy</p>
    </div>
    <form action="sendform.php" method="post">
      <h1>Otrzymuj powiadomienia 
          <br>o zmianach planu!
      </h1>
      <hr class="sep"/>
      <div class="group">
        <input type="text" name="fname" required autocomplete="off"/>
        <label>Imię</label>
      </div>
      <div class="group">
        <input type="email" name="email" required autocomplete="off" placeholder=" " value=""/>
        <label>Email</label>
      </div>
      <button class="btn" type="submit">ZAPISZ SIĘ</button>
    </form>
  </body>
</html>