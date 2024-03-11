document.addEventListener('DOMContentLoaded', ()=>{
    const convasFigure = document.getElementById("figure");
    if(!convasFigure){
        throw "Element #figure not found!";
    }
    const context = convasFigure.getContext('2d');
    window.gdc = context;
    window.figura = figure;

    const line1Button = document.getElementById("line1-btn");
    if(!line1Button){
        throw "Element #line1-btn not found!";
    }
    line1Button.onclick = drawLine1;

    const lineCosButton = document.getElementById("lineCos-btn");
    if(!lineCosButton){
        throw "Element #lineCos-btn not found!";
    }
    lineCosButton.onclick = drawCosX;

    const line2Button = document.getElementById("line2-btn");
    if(!line2Button){
        throw "Element #line2-btn not found!";
    }
    line2Button.onclick = drawLine2;

    const expandButton = document.getElementById("expand-button");
    if(!expandButton){
        throw "Element #expand-button not found!";
    }
    expandButton.onclick = expand;

    const resolutionButton = document.getElementById("resolution-button");
    if(!resolutionButton){
        throw "Element #resolution-button not found!";
    }
    resolutionButton.onclick = resolute;
});

function drawLine1(){
    window.gdc.beginPath();// початок нового рисування
    window.gdc.strokeStyle = "#e53935"; // колір ліній
    window.gdc.lineWidth = 2; //товщіна ліній 
    window.gdc.moveTo(15,15); //переміщення без сліду
    window.gdc.lineTo(285,135); // переміщення зі слідом
    window.gdc.stroke(); // відобразити резуьтат
}

function drawLine2(){
    window.gdc.beginPath();
    window.gdc.strokeStyle = "#dce775"; // колір ліній
    window.gdc.lineWidth = 2; //товщіна ліній 
    window.gdc.moveTo(25,15); //переміщення без сліду
    window.gdc.lineTo(295,135); // переміщення зі слідом
    window.gdc.stroke(); // відобразити резуьтат
}

function drawCosX(){

    window.gdc.beginPath();
    window.gdc.strokeStyle = "#000000"; // черный цвет
    window.gdc.lineWidth = 1;
    window.gdc.moveTo(0, 75);
    window.gdc.lineTo(300, 75); // ось x
    window.gdc.moveTo(150, 0);
    window.gdc.lineTo(150, 150); // ось y
    window.gdc.stroke();

    let w = 2
    window.gdc.beginPath();
    window.gdc.strokeStyle = "#dce775"; // колір ліній
    window.gdc.lineWidth = w; //товщіна ліній 
    window.gdc.moveTo(0, 75 - 75 * Math.cos(0-150) / 10);
    for(let i =0; i<300; i+=w){
        window.gdc.lineTo(i, 75 - 60 * Math.cos((i-150) / 10));
    }
    window.gdc.stroke();

    
}

function expand(){
    window.figura.style.width = "500px";
    window.figura.style.height = "300px";
}

function resolute(){
    window.figura.width = "500";
    window.figura.height = "300";
}

// function drawAxes() {
//     window.gdc.beginPath();
//     window.gdc.strokeStyle = "#000000"; // черный цвет
//     window.gdc.lineWidth = 1;
//     window.gdc.moveTo(0, 75);
//     window.gdc.lineTo(300, 75); // ось x
//     window.gdc.moveTo(150, 0);
//     window.gdc.lineTo(150, 150); // ось y
//     window.gdc.stroke();
// }
  

//////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () =>{
    loadAssets();
    window.location.hash = "";
    window.onhashchange = coinChanged;
    $("#clear").click(clearRates);
    // вызначаэмо розмир полотна на момент страрту , та змілюєм його раздільну здатність
    let canvas = $("#rates-canvas")[0];
    window.dcW = canvas.clientWidth;
    window.dcH = canvas.clientHeight;
    canvas.width = window.dcW ;
    canvas.height = window.dcH ;
    window.dc =  canvas.getContext('2d');
});

function clearRates(){
    window.dc.clearRect(0,0,window.dcW,window.dcH);
    window.location.hash = "";
}

function coinChanged(){
    // console.log(document.location.hash);
    if(window.location.hash.length <=1){
        return;
    }
    loadHistory(window.location.hash.substring(1));// без первого символа #
}

function randomColor(){
    let letters = '0123456789ABCDEF';
    let color = '#';
    for(let i = 0; i<6 ; i++){
        color += letters[Math.floor(Math.random()*16)];
        // console.log(i);
    }
    return color;
}
// function loadHistory(assetId){
//     $.ajax({  
//         method: "GET",
//         url: `https://api.coincap.io/v2/assets/${assetId}/history?interval=d1`})
//     .done( j => { 
//         // console.log(j) // данні для побудови графіку
//         console.log(j.data);
//         let minRate = Number(j.data[0].priceUsd);
//         let maxRate = Number(j.data[0].priceUsd);;
//         // let minTime = j.data[0].time;
//         // let maxTime = j.data[0].time;
//         let minTime = new Date(j.data[0].time).toLocaleDateString('uk-UA');
//         let maxTime = new Date(j.data[0].time).toLocaleDateString('uk-UA');
//         for(let rec of j.data){

//             let rate = Number(rec.priceUsd);
//             if(rate > maxRate){
//                 maxRate = rate;
//                 maxTime = new Date(rec.time).toLocaleDateString('uk-UA');
//             }
//             if(rate < minRate){
//                 minRate = rate;
//                 minTime = new Date(rec.time).toLocaleDateString('uk-UA');
//             }
//             if(rec.time > maxTime){
//                 maxTime = rec.time;
//             }
//             if(rec.time <minTime){
//                 minTime = rec.time;
//             }
//         }
//         const dc = document.getElementById("rates-canvas").getContext('2d');
//         let r = Math.floor(150*Math.random());
//         let g = Math.floor(150*Math.random());
//         let b = Math.floor(150*Math.random());
//         let a = 1;
//         dc.beginPath();
//         dc.lineWidth = 1;
//         dc.strokeStyle = randomColor();
//         for(let rec of j.data){
//             let rate = Number(rec.priceUsd);
//             let x = (rec.time - minTime) *  window.dcW / (maxTime - minTime);
//             let y = window.dcH - 10 - (rate - minRate) * (window.dcH - 20) / (maxRate - minRate);
//             dc.lineTo(x,y); 
//         }
//         dc.stroke();
//         a = 0.10;
//         dc.fillStyle = `rgba(${r},${g},${b},${a})`
//         dc.lineTo(window.dcW,window.dcH );
//         dc.lineTo(0,window.dcH );
//         dc.fill();

//         //dc.strokeText;
//         a = 1;
//         dc.fillStyle = `rgba(${r},${g},${b},${a})`
//         dc.fillText(Math.round(maxRate), window.dcW-50, 10);
//         dc.fillText(Math.round(minRate), window.dcW-50, window.dcH - 4);

//         dc.fillStyle= "#000";
//         dc.font = '12px Arial';dc.fillText(`Min Date: ${minTime}`, 10, 20); 
//         dc.fillText(`Max Date: ${maxTime}`, 10, 40); 
//     });
// }
function loadHistory(assetId){
    $.ajax({  
        method: "GET",
        url: `https://api.coincap.io/v2/assets/${assetId}/history?interval=d1`})
    .done( j => { 
        // console.log(j) // данні для побудови графіку
        console.log(j.data);
        let minRate = Number(j.data[0].priceUsd);
        let maxRate = Number(j.data[0].priceUsd);;
        let minTime = j.data[0].time;
        let maxTime = j.data[0].time;
        let minDate = new Date(j.data[0].time).toLocaleDateString('uk-UA');
        let maxDate = new Date(j.data[0].time).toLocaleDateString('uk-UA');
      
        for(let rec of j.data){

            let rate = Number(rec.priceUsd);
            if(rate > maxRate){
                maxRate = rate;
                maxDate = new Date(rec.time).toLocaleDateString('uk-UA');
            }
            if(rate < minRate){
                minRate = rate;
                minDate = new Date(rec.time).toLocaleDateString('uk-UA');
            }
            if(rec.time > maxTime){
                maxTime = rec.time;
            }
            if(rec.time <minTime){
                minTime = rec.time;
            }

        }
        const dc = document.getElementById("rates-canvas").getContext('2d');
        let r = Math.floor(150*Math.random());
        let g = Math.floor(150*Math.random());
        let b = Math.floor(150*Math.random());
        let a = 1;
        dc.beginPath();
        dc.lineWidth = 1;
        dc.strokeStyle = randomColor();
        for(let rec of j.data){
            let rate = Number(rec.priceUsd);
            let x = (rec.time - minTime) *  window.dcW / (maxTime - minTime);
            let y = window.dcH - 12 - (rate - minRate) * (window.dcH - 20) / (maxRate - minRate);
            dc.lineTo(x,y); 
        }
        dc.stroke();
        a = 0.10;
        dc.fillStyle = `rgba(${r},${g},${b},${a})`
        dc.lineTo(window.dcW,window.dcH );
        dc.lineTo(0,window.dcH );
        dc.fill();

        //dc.strokeText;
        a = 1;
        dc.fillStyle = `rgba(${r},${g},${b},${a})`
        dc.fillText(Math.round(maxRate), window.dcW-50, 10);
        dc.fillText(Math.round(minRate), window.dcW-50, window.dcH - 4);

        dc.fillStyle = '#000'; 
        dc.font = '10px Arial';
        dc.fillText(`Min Date: ${minDate}`, window.dcW-window.dcW+100, window.dcH-2); 
        dc.fillText(`Max Date: ${maxDate}`, window.dcW-window.dcW/4, window.dcH - 2);
    });
}

function loadAssets(){
    $.ajax({  
        method: "GET",
        url: "https://api.coincap.io/v2/assets?limit=7"})
    .done( j => { 
       //console.log(j);
       let html = "";
       for(let assets of j.data){
            html+=`<a href="#${assets.id}" class="btn btn-flat red darken-2 rate-button">${assets.name}</a> `;
        }
        document.getElementById("assets-block").innerHTML = html;
    });
}

/////////////////////////////////// STORAGE ///////////////////////////

// document.addEventListener('DOMContentLoaded', ()=>{
//     $("#local-btn").click(localClick);
//     $("#session-btn").click(sessionClick);
//     let saved = localStorage.getItem("saved"); // вилучення данних зі сховища
//     if(saved){
//         $("#local-input").val(saved);
//     }
//     $("#local-btn-delete").click(()=>{
//         localStorage.removeItem("saved");
//         $("#local-input").val("");
//         // location = location;
//     });
//     setInterval(timerTick, 1000); // таймер - періодичний запуск функціі 
// });

// function localClick(){
//     localStorage.setItem("saved", $("#local-input").val());// збереження у local-storge , saved - імя під яким зберігаются даніі, $("#local-input").val() - данні які зберігаются
//     //Якщо під ключем були данні , то воні перезапишутся , інакше - створятся
//     localStorage.setItem("moment", new Date()); // з метой обмеження тривалості зберігання до сховища додається мітка чаксу , аналіз якоі дозволить визначити інтервал збереження
// }

// function sessionClick(){
//     sessionStorage.setItem("saved", $("#session-input").val());
//     sessionStorage.setItem("moment", new Date());
// }

// function timerTick(){
//     let savedMoment = localStorage.getItem("moment");
//     let savedMomentSesion = sessionStorage.getItem("moment");

//     if(savedMoment && savedMomentSesion){
//         let moment = new Date(savedMoment);
//         let period = (new Date().getTime() - moment.getTime()) / 1000; // у секундах

//         let momentS = new Date(savedMomentSesion);
//         let periodS = (new Date().getTime() - momentS.getTime()) / 1000;

//         $("#local-petiod").text(Math.round(period));
//         $("#session-petiod").text(Math.round(periodS));
//         if(period>=10){// граничний час життя данних
//             localStorage.removeItem("saved");
//             localStorage.removeItem("moment");

//             sessionStorage.removeItem("saved");
//             sessionStorage.removeItem("moment");
//         }
        
//     }
//     else{
//         $("#local-petiod").text("-----");
//         $("#session-period").text("-----");
//    }
    
// }

document.addEventListener('DOMContentLoaded', () => {
    $("#local-btn").click(localButtonClick);
    $("#session-btn").click(sessionButtonClick);
    let saved = localStorage.getItem("saved");

    if (saved) {
        $("#local-input").val(saved)
    }
    $("#local-delete").click(_ => {
        localStorage.removeItem("saved");
        $("#local-input").val("")
    });
    $("#session-delete").click(_ => {
        sessionStorage.removeItem("saved");
        $("#session-input").val("")
    });
    setInterval(timerTick, 1000);
});

function localButtonClick() {
    localStorage.setItem( "saved",$("#local-input").val());
    localStorage.setItem("moment",new Date());
}

function sessionButtonClick() {
    sessionStorage.setItem("saved", $("#session-input").val());
    sessionStorage.setItem(
        "moment",
        new Date()
    );
}

function timerTick() {
    let savedMoment = localStorage.getItem("moment");
    let sessionMoment = sessionStorage.getItem("moment");
    if (savedMoment) {
        let moment = new Date(localStorage.getItem("moment"));
        let period = (new Date().getTime() - moment.getTime()) / 1000;
        //console.log(moment);
        $("#local-petiod").text(Math.round(period));
        if (period >= 10) {
            localStorage.removeItem("saved");
            localStorage.removeItem("moment");
        }
    }
    if(sessionMoment){
        let moment = new Date(sessionStorage.getItem("moment"));
        let period = (new Date().getTime() - moment.getTime()) / 1000;
        //console.log(moment);
        $("#session-petiod").text(Math.round(period));
        if (period >= 10) {
            sessionStorage.removeItem("saved");
            sessionStorage.removeItem("moment");
        }
    }
    else {
        $("#local-period").text("---");
        $("#session-petiod").text("---");
    }
}

/////////////////////
document.addEventListener('DOMContentLoaded', () => {
    $("#local-button").click(localButtonClick);
    $("#session-button").click(sessionButtonClick);
    window.timedrop = document.getElementById('session-timer');
    let saved = localStorage.getItem("saved");

    if (saved) {
        $("#local-input").val(saved)
    }
    $("#local-delete").click(_ => {
        localStorage.removeItem("saved");
        $("#local-input").val("")
    });
    $("#session-delete").click(_ => {
        sessionStorage.removeItem("saved");
        $("#session-input").val("")
    });
    setInterval(timerTick, 1000);
});

function localButtonClick() {
    localStorage.setItem(
        "saved",
        $("#local-input").val()
    );
    localStorage.setItem(
        "moment",
        new Date()
    );
}

function sessionButtonClick() {
    sessionStorage.setItem("saved", $("#session-input").val());
    sessionStorage.setItem(
        "moment",
        new Date()
    );
}

function timerTick() {
    var currentTime = new Date();
    var timeValue = window.timedrop.value;
    let savedMoment = localStorage.getItem("moment");
    let sessionMoment = sessionStorage.getItem("moment");
    if (savedMoment) {
        let moment = new Date(localStorage.getItem("moment"));
        let period = (new Date().getTime() - moment.getTime()) / 1000;
        $("#local-period").text(Math.round(period));
        const currentHourMinute = currentTime.getHours() * 60 + currentTime.getMinutes();
        const inputHourMinute = parseInt(timeValue.split(':')[0]) * 60 + parseInt(timeValue.split(':')[1]);
        if (currentHourMinute >= inputHourMinute) {
            localStorage.removeItem("saved");
            localStorage.removeItem("moment");
            localButtonClick();
            period = 0;
            window.timedrop.value = null;
        }
    }
    else{
        $("#local-period").text("---");
    }
    if (sessionMoment) {
        let moment = new Date(sessionStorage.getItem("moment"));
        let period = (new Date().getTime() - moment.getTime()) / 1000;
        //console.log(moment);
        $("#session-period").text(Math.round(period));
        const currentHourMinute = currentTime.getHours() * 60 + currentTime.getMinutes();
        const inputHourMinute = parseInt(timeValue.split(':')[0]) * 60 + parseInt(timeValue.split(':')[1]);
        if (currentHourMinute >= inputHourMinute) {
            sessionStorage.removeItem("saved");
            sessionStorage.removeItem("moment");
            sessionButtonClick();
            period = 0;
            window.timedrop.value = null;
        }
    }
    else {
        $("#session-period").text("---");
    }
}