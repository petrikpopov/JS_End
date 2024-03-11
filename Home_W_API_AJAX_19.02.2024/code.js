Number.prototype.localeCompare = function(otherNumber){
    const self = this.valueOf();
    if(self<otherNumber){
        return -1;
    }
    else if(self>otherNumber){
        return 1;
    }
    else{
        return 0;
    }
}
window.ascSymbol = "▼";
window.desSymbol = "▲";
window.sortMode = "none";

document.addEventListener('DOMContentLoaded', () =>{

    const buutonShow = document.getElementById("buttonShowClick");
    if(!buutonShow){
        throw "Element #buttonShowClick not found!";
    }
    buutonShow.addEventListener('click', loadRatesButtonClick)

});
    
function loadRatesButtonClick(){

    const dataInput = document.getElementById("data-input");
    if(!dataInput){
        throw "Element #data-input not found!";
    }
    const valueData = dataInput.value;

    const price = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?${valueData}&json`;
   
    fetch(price, {
    })
    .then(r=>{
       if(r.status!=200){
            alert('Fetch error:status'+r.status);
       }
       else{
            r.json()
            .then(j => {
                window.rates = j;
                showTable();
            });
       }
        
    })
    .catch(r =>{
        alert('Fetch error:status'+r);
    });

}

function showTable(){
    // проверяем есть ли сохранненые данные
    if(typeof window.rates==='undefined'){ //undefined - отсутвие данных
        throw "showTable() calls with empty 'window.rates' ";
    }
    const outBlockPrice = document.getElementById("outBlock");
    if(!outBlockPrice){
        throw "Element #outBlock not found!";
    }
    const ccSymbol = window.sortMode=="ccAsc" ? window.desSymbol : window.ascSymbol;
    const txtSymbol = window.sortMode=="txtAsc" ? window.desSymbol : window.ascSymbol;
    const rateSymbol = window.sortMode=="rateAsc" ? window.desSymbol : window.ascSymbol;
    const codeValet = window.sortMode=="r030Asc" ? window.desSymbol : window.ascSymbol;
    // let tableHtml = '<table>';
    let table = `<table class='rates-table'><tr><th>Код<b data-sort='cc'>${ccSymbol}</b></th><th>Назва <b data-sort='txt'>${txtSymbol}</b></th><th>Курс <b data-sort='rate'>${rateSymbol}</b></th><th class="valet-code">Код валюты <b data-sort='r030' ">${codeValet}</b></th></tr>`

   
    for (let item of window.rates) {
        table += `<tr><td>${item.cc}</td><td>${item.txt}</td><td>${item.rate}</td><td>${item.r030}</td></tr>`;
    }
    table += '</table>';
    outBlockPrice.innerHTML = table;
    addSortListeners();
}

function addSortListeners(){
    for(let b of document.querySelectorAll("[data-sort]")){
        b.addEventListener('click',sortFunction);
    }
}

function sortFunction(e){
    if(typeof window.rates==='undefined'){ //undefined - отсутвие данных
        throw "showTable() calls with empty 'window.rates' ";
    }

    const sortF = e.target.getAttribute("data-sort");

    console.log(`You sorted by:${sortF}`);

    let suffix;
    if(window.sortMode==`${sortF}Asc`){
        window.rates.sort((b,a)=>a[sortF].localeCompare(b[sortF]));
        suffix = "Desac";
    }
    else{
        window.rates.sort((a,b)=>a[sortF].localeCompare(b[sortF]));
        suffix = "Asc";
    }
    window.sortMode = `${sortF}${suffix}`;
    showTable();
}


  
  