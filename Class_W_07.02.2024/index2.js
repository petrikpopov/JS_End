document.addEventListener('DOMContentLoaded', function(){
    
    const buutonMinus = document.getElementById("button-minus");
    const buttonPlus = document.getElementById("button-plus");
    const countBlock = document.getElementById("count-block");
    if(buutonMinus){
        buutonMinus.addEventListener('click',counterMinus);
    }
    if(buttonPlus){
        buttonPlus.addEventListener('click',counterPlus);
    }
    if(countBlock){
        const value = countBlock.innerText;
        window.countBlock = Number(value);
    }
});

function counterPlus(){
    window.countBlock +=1;
    const block = document.getElementById("count-block");
    block.innerText = window.countBlock;
}
function counterMinus(){
    window.countBlock -=1;
    const blockMinus = document.getElementById("count-block");
    blockMinus.innerText = window.countBlock;
}