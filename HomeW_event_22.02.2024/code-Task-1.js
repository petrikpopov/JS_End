document.addEventListener('DOMContentLoaded', ()=>{
 
    const myInput = document.getElementById("input-1");
    if(!myInput){
        throw "Element #input-1 not found!"
    }

    myInput.addEventListener('keydown', enterName);
});

function enterName(e){

    if(e.keyCode>=48 && e.keyCode<=58){
        console.log(`Cod:${e.keyCode}`);
        e.preventDefault();
    }
}
