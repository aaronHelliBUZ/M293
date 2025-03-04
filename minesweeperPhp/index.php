<? $time = time() ?>
<?
    $hoehe = $_POST['hoehe'];
    $breite = $_POST['breite'];
    $anzahlBomben = $_POST['bomben'];
    $submitted = $_POST['submitted'];
    if($submitted == 1){
        if($hoehe < 6 || $hoehe > 25 || $breite < 6 || $breite > 25){
            $_POST['fehlerCode'] = 0;
        }elseif($anzahlBomben > ($hoehe * $breite / 3) || $anzahlBomben < ($hoehe * $breite) / 100 * 8){
            $_POST['fehlerCode'] = 1;
        }else{
            include('feld.php');
            exit;
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="stylesheet" href="./styles/stylesIndex.css?v=<? echo $time; ?>">
    </head>

    <body>
        <h2>Bitte wähle Höhe, Breite und Anzahl Bomben</h2>
        <form method="POST" action="index.php">
            Höhe: <input type="number" name="hoehe">
            Breite: <input type="number" name="breite">
            Anzahl Bomben: <input type="number" name="bomben">
            <input type="hidden" name="submitted" value=1>
            <input id="submit" type="submit">
        </form>
        <?
            $fehlerCode = $_POST['fehlerCode'];

            if($fehlerCode === 0){
                echo "<div class='fehler'>Die Höhe/Breite muss zwischen 6 und 25 liegen</div>";
            }elseif($fehlerCode === 1){
                echo "<div class='fehler'>Die Anzahl Bomben muss zwischen 10 % und 33.33% des Spielfelds liegen</div>";
            }
        ?>
    </body>
</html>