<?php $time = time() ?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="stylesheet" href="./styles/stylesFeld.css?v=<? echo $time; ?>">
        <script src="scripts/script.js" defer></script>
        <?php
            echo("
                <script>
                    window.addEventListener('load', function () {
                        script($hoehe - 1, $breite - 1, $anzahlBomben);
                    });
                </script>
            ")
        ?>
    </head>
    <body>
        <div id="anzahlFlaggen" data-test=1></div>
        <div id="Spielfeld">
        <?
            for($i = 0; $i < $hoehe; $i++){
                for($j = 0; $j < $breite; $j++){
                    echo "<div id='{$i}_{$j}div'><img src='img/Download__1_-removebg-preview.png' id='{$i}_{$j}' class='default'></div>";
                }
            }
        ?>
        </div>
        <div><a href="index.php">Zurück zur Startseite</a></div>
    </body>
</html>