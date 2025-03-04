function script(hoehe, breite, anzahlStartBomben){
    let style = document.createElement('style');

    style.textContent = `
        #Spielfeld{
            height: ${hoehe * 40}px;
            width: ${breite * 40}px;
            grid-template-columns: repeat(${breite + 1}, 29px);
            grid-template-rows: repeat(${hoehe + 1}, 29px);
        }
    `

    let spielfeld = new Array(hoehe + 1);

    for(let i = 0; i <= hoehe; i++){
        spielfeld[i] = new Array(breite + 1)
    }

    for(let i = 0; i <= hoehe; i++){
        for(let j = 0; j <= breite; j++){
            spielfeld[i][j] = 0;
        }
    }

    let spielzuege = 0;

    let bomben = [];

    for(let i = 0; i <= hoehe; i++){
        for(let j = 0; j <= breite; j++){
            let imgElm = document.getElementById(`${i}_${j}`);
            imgElm.addEventListener("click", KlickenMitParameter(Klicken, imgElm, 0));
            imgElm.addEventListener("contextmenu", Flagge);
        }
    }

    let anzahlFlaggenInit = document.getElementById('anzahlFlaggen');
    anzahlFlaggenInit.textContent = `Anzahl Flaggen: ${anzahlStartBomben}`

    document.head.appendChild(style)

    function KlickenMitParameter(func, ...args){
        return function(){
            func(...args);
        }
    }

    let j = 0;

    while(j < anzahlStartBomben){
        let randomY = parseInt(Math.random() * (hoehe + 1));
        let randomX = parseInt(Math.random() * (breite + 1));
        let bombElm = document.getElementById(`${randomY}_${randomX}`);
        if(bombElm.className != 'bomb'){
            spielfeld[randomY][randomX] = 1;
            bombElm.className = 'bomb';
            bomben.push(randomY + '_' + randomX);
            j++;
        }
    }

    console.log(spielfeld)
    console.log(bomben)
    
    let verfuegbareFlaggen = anzahlStartBomben;
    let anzahlFlaggenElm = document.getElementById('anzahlFlaggen');

    function Klicken(event, clearWenn0){
        let regexFlagged = /.*flagged.*/;
        let regexChecked = /.*checked.*/;
        let [y, x] = event.id.split('_')
        x = parseInt(x);
        y = parseInt(y);

        switch(clearWenn0){
            case 1:
                if((y) > 0 && (x) > 0){
                    event = document.getElementById(`${y - 1}_${x - 1}`)
                    y--;
                    x--;
                }else{
                    Clear0(2, event);
                }
                break;
            case 2:
                if((y) > 0){
                    event = document.getElementById(`${y - 1}_${x}`)
                    y--;
                }else{
                    Clear0(3, event);
                }
                break;
            case 3:
                if((parseInt((y))) > 0 && (x) < breite){
                    event = document.getElementById(`${y - 1}_${x + 1}`)
                    y--;
                    x++;
                }else{
                    Clear0(4, event);
                }
                break;
            case 4:
                if((x) > 0){
                    event = document.getElementById(`${y }_${x - 1}`)
                    x--;
                }else{
                    Clear0(5, event);
                }
                break;
            case 5:
                if((x) < breite){
                    event = document.getElementById(`${y}_${x + 1}`)
                    x++;
                }else{
                    Clear0(6, event);
                }
                break;
            case 6:
                if((parseInt((y))) < hoehe && (x) > 0){
                    event = document.getElementById(`${y + 1}_${x - 1}`)
                    y++;
                    x--;
                }else{
                    Clear0(7, event);
                }
                break;
            case 7:
                if((parseInt((y))) < hoehe){
                    event = document.getElementById(`${y + 1}_${x}`)
                    y++;
                }else{
                    Clear0(8, event);
                }
                break;
            case 8:
                if((parseInt((y))) < hoehe && (x) < breite){
                    event = document.getElementById(`${y + 1}_${x + 1}`)
                    y++;
                    x++;
                }else{
                    Clear0(9, event);
                }
                break;
            default:
                break;
        }

        if(!regexFlagged.test(event.className) && !regexChecked.test(event.className)){
            event.classList.add('checked')
            let aktuellesElmY = y;
            let aktuellesElmX = x;
            console.log(aktuellesElmY + "_" + aktuellesElmX)
            let anzahlBomben = 0;
            if(BombenUeberpruefung(bomben, event)){
                if(spielzuege == 0){
                    verfuegbareFlaggen--;
                    spielfeld[aktuellesElmY][aktuellesElmX] = 0;
                    anzahlFlaggenElm.textContent = `Anzahl Flaggen: ${verfuegbareFlaggen}`;
                }else{
                    alert('Game Over: Bombe erwischt');
                    location.reload();
                }
            }
            spielzuege++;
            if(spielzuege == ((breite + 1) * (hoehe + 1)) - verfuegbareFlaggen){
                alert('Gewonnen!');
                location.reload();
            }

            if(aktuellesElmX == 0){
                if(aktuellesElmY == 0){
                    anzahlBomben += spielfeld[0][1];
                    anzahlBomben += spielfeld[1][0];
                    anzahlBomben += spielfeld[1][1];
                }else if(aktuellesElmY == hoehe){
                    anzahlBomben += spielfeld[hoehe - 1][0];
                    anzahlBomben += spielfeld[hoehe - 1][1];
                    anzahlBomben += spielfeld[hoehe][1];
                }else{
                    anzahlBomben += spielfeld[aktuellesElmY - 1][aktuellesElmX];
                    anzahlBomben += spielfeld[aktuellesElmY - 1][aktuellesElmX + 1];
                    anzahlBomben += spielfeld[aktuellesElmY][aktuellesElmX + 1];
                    anzahlBomben += spielfeld[aktuellesElmY + 1][aktuellesElmX];
                    anzahlBomben += spielfeld[aktuellesElmY + 1][aktuellesElmX + 1];
                }
            }else if(aktuellesElmX == breite){
                if(aktuellesElmY == 0){
                    anzahlBomben += spielfeld[0][breite -1];
                    anzahlBomben += spielfeld[1][breite -1];
                    anzahlBomben += spielfeld[1][breite];
                }else if(aktuellesElmY == hoehe){
                    anzahlBomben += spielfeld[hoehe - 1][breite - 1];
                    anzahlBomben += spielfeld[hoehe - 1][breite];
                    anzahlBomben += spielfeld[hoehe][breite - 1];
                }else{
                    anzahlBomben += spielfeld[aktuellesElmY - 1][aktuellesElmX - 1];
                    anzahlBomben += spielfeld[aktuellesElmY - 1][aktuellesElmX];
                    anzahlBomben += spielfeld[aktuellesElmY][aktuellesElmX - 1];
                    anzahlBomben += spielfeld[aktuellesElmY + 1][aktuellesElmX - 1];
                    anzahlBomben += spielfeld[aktuellesElmY + 1][aktuellesElmX];
                }
            }else if(aktuellesElmY == 0){
                anzahlBomben += spielfeld[aktuellesElmY][aktuellesElmX - 1];
                anzahlBomben += spielfeld[aktuellesElmY][aktuellesElmX + 1];
                anzahlBomben += spielfeld[aktuellesElmY + 1][aktuellesElmX - 1];
                anzahlBomben += spielfeld[aktuellesElmY + 1][aktuellesElmX];
                anzahlBomben += spielfeld[aktuellesElmY + 1][aktuellesElmX + 1];
            }else if(aktuellesElmY == hoehe){
                anzahlBomben += spielfeld[aktuellesElmY - 1][aktuellesElmX - 1];
                anzahlBomben += spielfeld[aktuellesElmY - 1][aktuellesElmX];
                anzahlBomben += spielfeld[aktuellesElmY - 1][aktuellesElmX + 1];
                anzahlBomben += spielfeld[aktuellesElmY][aktuellesElmX - 1];
                anzahlBomben += spielfeld[aktuellesElmY][aktuellesElmX + 1];
            }else{
                anzahlBomben += spielfeld[aktuellesElmY - 1][aktuellesElmX - 1];
                anzahlBomben += spielfeld[aktuellesElmY - 1][aktuellesElmX];
                anzahlBomben += spielfeld[aktuellesElmY - 1][aktuellesElmX + 1];
                anzahlBomben += spielfeld[aktuellesElmY][aktuellesElmX - 1];
                anzahlBomben += spielfeld[aktuellesElmY][aktuellesElmX + 1];
                anzahlBomben += spielfeld[aktuellesElmY + 1][aktuellesElmX - 1];
                anzahlBomben += spielfeld[aktuellesElmY + 1][aktuellesElmX];
                anzahlBomben += spielfeld[aktuellesElmY + 1][aktuellesElmX + 1];
            }
            
            let anzahlBombenP = document.createElement('p');
            anzahlBombenP.textContent = anzahlBomben;

            let parentContainer = document.getElementById(`${aktuellesElmY}_${aktuellesElmX}div`);
            parentContainer.appendChild(anzahlBombenP);

            if(anzahlBomben == 0){
                Clear0(1, event)
            }
        }
    }

    function Clear0(wiederholungen, event){
        for(let i = wiederholungen; i <= 8; i++){
            Klicken(event, i);
        }
    }

    function BombenUeberpruefung(bomben, aktuellesElm){
        for(let i = 0; i < anzahlStartBomben; i++){
            if(aktuellesElm.id == bomben[i]){
                return true;
            }
        }
        return false;
    }

    function Flagge(event){
        event.preventDefault();
        let regexFlagged = /.*flagged.*/;

        if(verfuegbareFlaggen > 0 && !(regexFlagged.test(event.target.className))){
            event.target.classList.add('flagged');
            verfuegbareFlaggen--;
            spielzuege++;
            anzahlFlaggenElm.textContent = `Anzahl Flaggen: ${verfuegbareFlaggen}`;
            if(spielzuege == ((hoehe + 1) * (breite + 1))){
                alert('Gewonnen!');
                location.reload();
            }
        }else if((regexFlagged.test(event.target.className))){
            event.target.classList.remove('flagged');
            verfuegbareFlaggen++;
            spielzuege--;
            anzahlFlaggenElm.textContent = `Anzahl Flaggen: ${verfuegbareFlaggen}`;
        }
    }
}