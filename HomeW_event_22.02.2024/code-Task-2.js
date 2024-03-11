document.addEventListener('DOMContentLoaded', ()=>{
    const buttonOpen = document.getElementById("openModel");
    if(!buttonOpen){
        throw "Element #openModel not found!"
    }
    buttonOpen.addEventListener('click',openModelWindow);

    const buttonClose = document.getElementById("buttonClose");
    if(!buttonClose){
        throw "Element #buttonClose not found!"
    }
    buttonClose.addEventListener('click', closeModelWindow);
});

function openModelWindow(e) {
    
    const myModelW = document.getElementById("myModel");
    if (!myModelW) {
        throw "Element #myModel not found!";
    }
    myModelW.classList.add("open");
}

function closeModelWindow(e){
    const myModelW = document.getElementById("myModel");
    if(!myModelW){
        throw "Element #myModel not found!";
    }
    myModelW.classList.remove("open");
}