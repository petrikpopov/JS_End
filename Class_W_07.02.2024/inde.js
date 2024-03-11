document.addEventListener('DOMContentLoaded', function(){

    window.obj ={
        "Name": "23"
    };
    updatePerson();
    
    const addButton = document.getElementById("add");
    if(addButton){
        addButton.onclick = addInfoPerson;
    }

   
});

function addInfoPerson(){

    const inputName = document.getElementById("name");
    if(!inputName){
        throw "Element #name not found!";
    }

    const inputAge = document.getElementById("age");
    if(!inputAge){
        throw "Element #age not found!";
    }

    if(window.obj.hasOwnProperty(inputName.value)){
        alert("Hello");
        return;
    }


    window.obj[inputName.value] = inputAge.value;
    updatePerson();
}

function updatePerson(){
    const showInfo = document.getElementById("show-info");
    if(!showInfo){
        throw "Element #show-info not found!";
    }
    showInfo.innerHTML = "";
    for(let i in window.obj)
    {
       showInfo.innerHTML += `${i}: ${window.obj[i]}<br/>`;
    }
}

