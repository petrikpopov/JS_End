document.addEventListener('DOMContentLoaded', function(){
   window.mass = [
       {name:"Ivan",surname:"Experienced"},
       {name:"Petro",surname:"Popov"},
       {name:"Admin",surname:"Networker"},
       {name:"Moder",surname:"Designer"}
   ];

   registeredPerson();
});

function registeredPerson(){

    const tableShow = document.getElementById("wrapper-table");
    if(!tableShow){
        throw "Element #wrapper-table not found!";
    }
    
    const table = document.createElement("table"); //создается таблица
    // создаем заголовки таблицы
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const nameHeader = document.createElement("th");
    const surnameHeader = document.createElement("th");

    nameHeader.textContent = "Name";
    surnameHeader.textContent = "Surname";

    headerRow.appendChild(nameHeader);
    headerRow.appendChild(surnameHeader);
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const bodyTable = document.createElement("tbody");// Создаем тело таблицы

     // Добавляем данные в таблицу
     for(let user of  window.mass){
        let row = document.createElement("tr");
        let nameCell = document.createElement("td");
        let surnameCell = document.createElement("td");

        nameCell.textContent = user.name;
        surnameCell.textContent = user.surname;

        row.appendChild(nameCell);
        row.appendChild(surnameCell);
        
        bodyTable.appendChild(row);
        tableShow.appendChild(bodyTable);
    }
    table.appendChild(bodyTable);
    tableShow.appendChild(table);


}

