// Для того щоб робота скрыпта не залежада вид його мисця пиделюченны (до чи писля елементив , на яки вин посилаэться) робота з элементамы маэ звийснятысь не ранише появы подии DOMContentLoaded(Фналог windoLoaded у WPF)
document.addEventListener('DOMContentLoaded',function(){
    const decrementButton = document.getElementById("decrement-button");
    const incrementbutton = document.getElementById("increment-button");
    if(decrementButton)
    {
        decrementButton.addEventListener('click',decrementButtonClick);
    }
    if(incrementbutton)
    {
        incrementbutton.addEventListener('click',incrementButtonClick);
    }
    const counterValue = document.getElementById("counter");
    if(counterValue){
        const value = counterValue.innerText; // получаем значение с разметки ,innerText так как это не инпут
        window.counterValue = Number(value);
    }
    //При натисканні ++ у value знаходится текст (string) відповідно оперія ++ відбудеться у рядковому режему (10+1= 101) оскільки така операція для рядків можліва 
    // Колі натіскаєм -- подається операція - , але для рядків вона не визначенна
    // Правило JS: починається автоматичне перетворення типів для яких така опеція можлива
    // Зупиняється на числовому типі, оскільки рядок (101) може бути перетворенний до числа.
    // Після цього все чісловой результат зберигається у window.counterValue і наступне натискання ++ відбудится з числовими типами(100+1 = 101) 

    const decrementButton2 = document.getElementById("decrement-button2");
    const incrementbutton2 = document.getElementById("increment-button2");
    if(decrementButton2)
    {
        decrementButton2.addEventListener('click',decrementButtonClick2);
    }
    if(incrementbutton2)
    {
        incrementbutton2.addEventListener('click',incrementButtonClick2);
    }
    const counterValue2 = document.getElementById("counter2");

    if(counterValue2)
    {
        window.counter2 ={  // конструктор обьекту 
            "element": counterValue2, // JSON - JS Object Notation
            "value": Number(counterValue2.innerText)
        };
    }
});

function decrementButtonClick2(){
    window.counter2.element.innerText = (window.counter2.value -=1);
}
function incrementButtonClick2(){
    window.counter2.element.innerText = (window.counter2.value +=1);
}

function decrementButtonClick(){
    window.counterValue -=1;
    const counterValue = document.getElementById("counter");
    counterValue.innerText = window.counterValue;
}

function incrementButtonClick()
{
    window.counterValue +=1;
    const counterValue = document.getElementById("counter");
    counterValue.innerText = window.counterValue;
}