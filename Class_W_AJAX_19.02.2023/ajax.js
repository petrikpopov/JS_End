Number.prototype.localeCompare = function(otherNumber){
    const self = this.valueOf();
    if(self<otherNumber){
        return -1;
    }
    if(self>otherNumber){
        return 1;
    }
    else{
        return 0 ;
    }
}

window.ascSymbol = "▼";
window.descSymbol = "▲";
window.sortMode = "none";

document.addEventListener('DOMContentLoaded', ()=> {
    
    const losdReatesButton = document.getElementById("load-Rates-button");
    if(!losdReatesButton){
        throw "Elment #load-Rates-button not found!"
    }
    losdReatesButton.addEventListener('click', loadRatesButtonClick);
});

function loadRatesButtonClick(){
    const url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
    fetch(url, { // запуск запиту
        // method:'GET',
        // headers:{
        //     'Accept':'application.json',
        //     'Connection':'close'
        // },
        // body:"...."
    })
    .then( response => { // прожовження яке викоється після пиходу відповідей
        //console.log(response);
        // uotBlock.innerHTML = `Status-code:<b>${response.status}</b><br/>ok:<b>${response.ok}</b><br/>`;
        // return response.text(); // запуск видобутку тіла у вигляді текста
        if(response.status!=200){
            alert('Fetch error:status'+response.status);
        }
        else{
            response.json()// запуск видобутку тіла у вигляді JSON
              .then(j => { // продовження яке запуститься(виконаєтся) після видобутку тіла
                window.rates = j; // зберігаємо обржані данні в глобальному обьекті(window)
                showTable();
            });
        }
    })
    .catch(reason =>{
        alert('Fetch error:status'+reason);
    });
}

function showTable(){
    // проверяем есть ли сохранненые данные
    if( typeof window.rates === 'undefined'){ //undefined - отсутвие данных
        throw "showTable() calls with empty 'window.rates' ";
    }

    const uotBlock = document.getElementById("out-block");
    if(!uotBlock){
        throw "Elment #out-block not found!"
    }
    const ccSymbol=window.sortMode == "ccAsc" ? window.descSymbol : window.ascSymbol;
    const txtSymbol=window.sortMode == "txtAsc" ? window.descSymbol : window.ascSymbol;
    const rateSymbol=window.sortMode == "rateAsc" ? window.descSymbol : window.ascSymbol;
    let table = `<table class='rates-table'><tr><th>Код <b data-sort='cc'>${ccSymbol}</b></th><th>Назва <b data-sort='txt'>${txtSymbol}</b></th><th>Курс <b data-sort='rate'>${rateSymbol}</b></th></tr>` // за правилами DOM всі зміни які вногстяься в DOM призводять до перерахунку всього документа(дерева)
    for(let rate of window.rates){
        table += `<tr><td>${rate.cc}</td><td>${rate.txt}</td><td>${rate.rate}</td></tr>`;
    }
    table += "</table>"

    uotBlock.innerHTML = table;
    addSortListeners();
       // попередньо анализуэмо --> j - це массів з обьектів { "r030":36,"txt":"Австралійський долар","rate":24.7615,"cc":"AUD","exchangedate":"19.02.2024"}
}

function addSortListeners(){
    for(let b of document.querySelectorAll("[data-sort]")){
        b.addEventListener('click', sortClick)
    }
}

function sortClick(e){

    if( typeof window.rates === 'undefined'){ //undefined - отсутвие данных
        throw "sortClick() calls with empty 'window.rates' ";
    }
    const sortField = e.target.getAttribute("data-sort");

    console.log(`Sorted by: ${sortField}`);
    
    let suffix ;
    if(window.sortMode==`${sortField}Asc`){
        window.rates.sort((b,a)=>a[sortField].localeCompare(b[sortField]));
        suffix = "Desc"
    }
    else{
        window.rates.sort((a,b)=>a[sortField].localeCompare(b[sortField]));
        suffix = "Asc"
    }

    window.sortMode= `${sortField}${suffix}`;

    // window.rates.sort((a,b)=>a.cc.localeCompare(b.cc));
  
    showTable();

}
// &#x25B2; ▲
// &#x25B4; ▴
// &#x25BC; ▼
// &#x25BE; ▾
