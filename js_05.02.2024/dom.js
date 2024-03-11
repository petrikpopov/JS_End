function helloClick() {
    // знаходімо єлемент input id="user"
    const userinput = document.getElementById("user"); 
    // проверяем нашли ли элимент 
    if(!user){ // bool -представлення кожен обьект може бути умовою (мати логічне відображення) 
            // false- "" , 0 , undefined , null  
        throw "Element 'user' not found"; 
    }

    const userName = userinput.value;
    if(!userName){
        alert('Введіть ім^я'); // ; - не обязательна , розрыв рядка(\n) - заміна
        return;
    }

    //шукаємо блок для виведення
    const outBloc = document.querySelector("#out-block"); // виконавецб сss - селектор
    if(!outBloc){
        throw "Element #out-block not found";
    }
    // outBloc.innerText = "Hello " + userName;
    outBloc.innerHTML = `Hello, <b>${userName}</b>`;
}



