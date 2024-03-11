document.addEventListener('DOMContentLoaded', ()=>{
    // document.getElementById("div1")
    // .addEventListener('click',div1Click);

    // document.getElementById("div1-2")
    // .addEventListener('click',div1Click);
    for(let btn of document.querySelectorAll(".div1")){
        btn.addEventListener('click', div1Click);
    }

    document.getElementById("input-1")
    .addEventListener('keydown',onKeyDown);
    document.getElementById("input-1")
    .addEventListener('keypress',onKeyPress);
    document.getElementById("input-1")
    .addEventListener('change',onChange);

});  
function onKeyDown(e){ // системна подя на всі клавіші 
    // console.log(e);
    e.target.parentNode.querySelector('span').innerText = `${e.key}(${e.keyCode})`;
    if((e.keyCode<48 || e.keyCode>57) && (e.keyCode!==8)&& (e.keyCode!==46)&& !(e.keyCode>=37 && e.keyCode<=40)){
        e.preventDefault();//скасування подіі , символ не буде відображений
    }
    
}


function onKeyPress(e){// legacy подія , тільки на текстові
    console.log(e);
}

function onChange(e){// виникає коли текст змінюється і завершуєтся нвбір виходом росхокосуванням з елементу 
    console.log(e);
}

function div1Click(e){

    const div = e.target.closest("div");
    div.querySelector('span').innerText = e.target.tagName;
    // const span = div.querySelector('span');
    // span.innerText = div.getAttribute("data-info");
    // const div = e.target.closest("div");
    // console.log(div);
    // console.log(e.target); - залежить від композиціі, від внутрішньоі будови
}

//////////////////DragEndDrop//////////////////
//DragEndDrop  - реалізужться взаємодією кількома подіями - затисканням кнопки миши і відпускання кнопки миші.

document.addEventListener('DOMContentLoaded' , ()=>{
    //затискання миші - лише в середині елементів , які це дозволяють
    // (data-type=dragdrop)
    
    let x = 0;
    for(let d of document.querySelectorAll('[data-type="dragdrop"]')){
        d.addEventListener("mousedown",onDounMouse);
        d.style.left = x+'px';
        x+=60;
    }
    //рух та відпускання миші - блок з дозволенним перетягуванням, або весь документ
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    window.dragetElement = null;// взаємодія між подіями забезпечується через (глобальне поле обькту window);

    window.choice = {
        'positive':[],
        'negative':[]
    };
});
let initialX;
function onDounMouse(e){
    window.dragetElement = e.target.closest('[data-type="dragdrop"]');
    // console.log(window.dragetElement);
    e.preventDefault();
    //style.left - це те що прописанно у стилях. Якщо у стилях немає запису , то значення порожнє
    // !!!Для визначення реальних розмірів та позицій , використовуются інші(не стильові поля)
    // console.log(window.dragetElement.offsetLeft,  window.dragetElement.offsetTop)
    // треба зафіксувати поточні координати миші - вони будут новою точкою відліку для блоку.
    window.dragetElement.tapX = e.pageX - window.dragetElement.offsetLeft;
    window.dragetElement.tapY = e.pageY - window.dragetElement.offsetTop;
    const container = window.dragetElement.closest(".dnd-container");
    if(!container){
        throw "Element #dnd-container not found";
    }
    window.dragetElement.maxX = container.clientWidth - window.dragetElement.offsetWidth;
    window.dragetElement.maxY = container.clientHeight - window.dragetElement.offsetHeight;

    // фікскємо почуткове положення обьякту 

    window.dragetElement.startX = window.dragetElement.style.left
    window.dragetElement.startY = window.dragetElement.style.top;

    initialX = window.dragetElement.offsetLeft;
}

function onMouseMove(e){
    if(window.dragetElement){
        let newX = e.pageX - window.dragetElement.tapX;
        let newY = e.pageY - window.dragetElement.tapY;
        if(newX<0 || newY<0 || newX> window.dragetElement.maxX){
            return;
        }
        window.dragetElement.style.left = newX + 'px';
        window.dragetElement.style.top = newY + 'px';
    }
}

function onMouseUp(e){
    
    if(window.dragetElement){
        window.dragetElement.style.zIndex = -1;
        //оскільки в контейнері можуть бути інші елементи, під курсором миші може виявитись не контейнер , а інший елемент, або декілька
        //відповідно перебираємо всі елементи і перевіряємо чи це контейнер
        const elements = document.elementsFromPoint(e.pageX, e.pageY);
        window.dragetElement.style.zIndex = 1;
        let isTarget = false;
        for(let elment of elements){
            if(elment.classList.contains("dnd-target")){
                console.log("in target");

                isTarget = elment;
            }
        }

        window.dragetElement.style.zIndex = 1;
    
        if(isTarget){
            // console.log("in target");

            window.dragetElement.style.top = isTarget.offsetTop + isTarget.clientHeight / 2.0 -  window.dragetElement.clientHeight / 2.0 + 'px';
            window.dragetElement.style.left = isTarget.offsetLeft + isTarget.clientWidth / 2.0 -  window.dragetElement.clientWidth / 2.0 + 'px';
            // Перевирыты чы э елемент в якомусь масыви , якщо э - вылучыты 
            if(isTarget.classList.contains("dnd-positive")){
                window.choice.positive.push(window.dragetElement);
            }
            else{
                window.choice.negative.push(window.dragetElement);
            }
            
            if(isTarget.classList.contains("dnd-positive")){
                let shift = 20; //  видноспо позитивного контейнера
                for(let elem of window.choice.positive){
                    elem.style.left = shift + 'px';
                    shift += 30;
                }
            }
            else{
                let shift = 420; //  видноспо негатывного контейнера
                for(let elem of window.choice.negative){
                    elem.style.left = shift + 'px';
                    shift += 30;
                }
            }
            
            //якщо було успішне перенесення , перевіряємо чи залишились не розподілені елементи. Якщо всі розподілені - завершуємо вправу
            if(isAllDragged()){
                alert('Дякуємо за ваші відповіді!');
                // перезавантажуємо сторінку
                // location = location;
            }
        }
        else{
            // console.log("out of target");
            //повертаєм елемент на початкову позицію
            window.dragetElement.style.transform = 'translate(' + window.dragetElement.startX + 'px, ' + window.dragetElement.startY + 'px)';
        }
        window.dragetElement = null;
    }
}



function isAllDragged(){

    let rez = true;
    for(let d of document.querySelectorAll('[data-type="dragdrop"]')){
        // чи елемент d знаходиться у контейнірі
        // - не годиться якщо не переносити d у підлеглість контейнера
        // визначаємо позицію елементу 
        let rect = d.getBoundingClientRect();
        // скануємо всі елементи у точці під данним елементом, шукаємо контейнер
        const elements = document.elementsFromPoint(rect.x, rect.y);
        let isTarget = false;
        for(let elment of elements){
            if(elment.classList.contains("dnd-target")){
                isTarget = true;
            }
        }
        // якщо не знайдено ("dnd-target") - елемент не розподілений
        if(!isTarget){
            rez = false;
        }
       
    } 
    return rez;
}