document.addEventListener('DOMContentLoaded', function(){
    document.getElementById("dragdrop").addEventListener("mousedown", functionDownMouse);
    document.addEventListener("mousemove", functionMoveMouse)
    document.addEventListener("mouseup", functionUpMouse)
    window.DragetElement = null;
});

function functionDownMouse(e){
    window.DragetElement = e.target.closest('#dragdrop');//аписывается элемент, который был нажат
    e.preventDefault();
    console.log(window.DragetElement.offsetLeft, window.DragetElement.offsetTop)//В консоль выводятся текущие координаты левого верхнего угла и правого
    window.DragetElement.tapX = e.pageX - window.DragetElement.offsetLeft; // записываем в переменную tapX - начение координаты X точки, в которой пользователь нажал кнопку мыши относительно элемента #dragdrop.
    window.DragetElement.tapY = e.pageY - window.DragetElement.offsetTop;
    const container = window.DragetElement.closest(".wrapper");
    if(!container){
        throw "Element #wrapper not found";
    }
    window.DragetElement.maxX = container.clientWidth - window.DragetElement.offsetWidth;
    //yстанавливает максимальное значение координаты X (горизонтальной координаты) для элемента window.dragetElement, чтобы он не мог выйти за пределы контейнера по горизонтали. 
}

function functionMoveMouse(e){
    if(window.DragetElement){
        //В переменные newX и newY записываются новые координаты элемента window.dragetElement. Эти координаты вычисляются как разница между текущими координатами курсора мыши (e.pageX и e.pageY) и начальными координатами курсора (window.dragetElement.tapX и window.dragetElement.tapY).
        let newCoordX = e.pageX - window.DragetElement.tapX; 
        let newCoordY = e.pageY - window.DragetElement.tapY;
        if(newCoordX<0 || newCoordY<0){
            return;
        }
        window.DragetElement.style.left = newCoordX + 'px';
        window.DragetElement.style.top = newCoordY + 'px';
    }
        
}

function functionUpMouse(e){
    if(window.DragetElement){
        window.DragetElement.style.zIndex = -1;
        const element = document.elementFromPoint(e.pageX, e.pageY);
        window.DragetElement.style.zIndex = 1;
        if(element.classList.contains("dnd-target")){
            console.log("in target");

            const targetWidth = element.clientWidth;
            const targetHeigth = element.clientHeight;
            
            
            const targetCenterX = element.offsetLeft + targetWidth / 2;// Получаем координаты центра целевого элемента
            const targetCenterY = element.offsetTop + targetHeigth / 2;

            // Вычисляем новые координаты для центрирования элемента
            const newLeft = targetCenterX - window.DragetElement.offsetWidth / 2;
            const newTop = targetCenterY - window.DragetElement.offsetHeight / 2;

            // Устанавливаем новые координаты для центрирования элемента
            window.DragetElement.style.left = newLeft + 'px';
            window.DragetElement.style.top = newTop + 'px';
        }
        else{
            console.log("out target");
        }
        window.DragetElement = null;
    }
}


