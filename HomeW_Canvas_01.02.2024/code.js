let isDrawing = false;
let colorValue;
let x = 0;
let y = 0;

document.addEventListener('DOMContentLoaded', ()=>{
    window.canvas = document.getElementById("mycanvas");
    if(!canvas){
        throw "Element #mycanvas not found!"
    }
    window.canvas.style.cursor = "pointer";

    const colorPick = document.getElementById("colorPicker");
    if(!colorPick){
        throw "Element #colorPicker not found!";
    }

    window.context = window.canvas.getContext('2d');
    
   colorValue = colorPick.value;
    colorPick.addEventListener("change" , function(){
        colorValue = colorPick.value;
    });

    window.canvas.addEventListener("mousedown", (e)=>{
        isDrawing = true;
        [x,y] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup' , ()=> isDrawing = false);
});


function draw(e){

    if(!isDrawing){
        return;
    }
    
    window.context.strokeStyle = colorValue;
    window.context.beginPath();
    window.context.moveTo(x,y);
    window.context.lineTo(e.offsetX, e.offsetY);
    window.context.stroke();
    [x,y] = [e.offsetX, e.offsetY];
}


