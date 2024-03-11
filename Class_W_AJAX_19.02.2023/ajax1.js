document.addEventListener('DOMContentLoaded', ()=>{
    const buttonShowReates = document.getElementById("button-show-reates");
    if(!buttonShowReates){
        throw "Element #button-show-reates not found!";
    }

    buttonShowReates.addEventListener('click', showReatesBanck);
});

function showReatesBanck(){
    
    const blockShow = document.getElementById("show-reates");
    if(!blockShow){
        throw "Element #show-reates not found!";
    }

    const url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
    fetch(url, {

    })
    .then(r =>{
        console.log(r);
        blockShow.innerHTML += `Status:${r.status}<br/>OK:${r.ok}`;
        return r.json();
        // return r.text();
    })
    .then(r =>{
        let table = "<table class='rates-table'><tr><th>Код <b data-sort='cc'>&#x25BC;</b></th><th>Назва <b>&#x25BC;</b></th><th>Курс <b>&#x25BC;</b></th></tr>"
        for(let mass of r){
            table += `<tr><td>${mass.cc}</td><td>${mass.txt}</td><td>${mass.rate}</td></tr>`;
        }
        table += "</table>"
        blockShow.innerHTML += table;
        // blockShow.innerHTML += r;
    })

}