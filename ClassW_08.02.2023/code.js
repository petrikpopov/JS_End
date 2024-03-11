document.addEventListener('DOMContentLoaded',function(){

    //Массиви і колекціі [] - конструктор масіву(array)
    window.users=[
       {name:"User ", surname:"Popov"}, // масив складається з обьектів , але це не принципово, у масиві можуть бути довільні елементи
       {name:"Ivan ", surname:"Js"}, 
       {name:"Petro ", surname:"Front-end"},
    ];

    updateRegisterUsers();

});

function updateRegisterUsers(){ // оновлення переліка раєрестрованих користувачів
    const userContainer = document.getElementById("registered-users");
    if(!userContainer){
        throw "Element #registered-users not found!";
    }
    userContainer.innerHTML = " ";
    // инший підхід з роботи DOM - програмный
    // готужмо эелемент <ul>
    const ul = document.createElement("ul");
    ul.style['list-style'] = 'none';
    // циклічно стровюємо елементи <li> зопавнюємо іх і додаємо до <ul>
    for(let user of window.users){
        let li = document.createElement("li");
        let txt = document.createTextNode(`name:${user.name}\tsurname:${user.surname}`);
        li.appendChild(txt);
        ul.appendChild(li);
    }
    userContainer.appendChild(ul);
}