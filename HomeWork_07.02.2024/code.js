document.addEventListener('DOMContentLoaded',function(){
    
    window.obj={
        "Name": "User",
        "Age": 12
    }
    updateBox();
    
    const buutonAdd = document.getElementById("add");
    if(buutonAdd){
        buutonAdd.onclick = addObject;
    }
});

function addObject(){
    const enterName = document.getElementById("enter_name");
    if(!enterName){
        throw "Element #enter_name nor found!";
    }
    const enterAge = document.getElementById("enter_age");
    if(!enterAge){
        throw "Element #enter_age nor found!";
    }
    if(window.obj.hasOwnProperty(enterName.value)){
        alert(`Пользователь с ником:${enterName.value} уже есть!`);
        return;
    }
    window.obj[enterName.value] = enterAge.value;
    updateBox();
    enterName.value = "";
    enterAge.value="";
}

function updateBox(){
    const showAllObject = document.getElementById("show");
    if(!showAllObject){
        throw "Elemet #show not found!";
    }
    showAllObject.innerHTML = ""; 
    for(let i in window.obj){
    showAllObject.innerHTML += `${i}:${window.obj[i]}<br/>`;
    }
}