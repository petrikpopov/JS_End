document.onsubmit = function(e){ // событие, которое срабатывает, когда пользователь отправляет форму

    e.preventDefault();//предотвращает отправку формы браузером по умолчанию

    const inputNAme = e.target.querySelector('[name="user-name"]');
    if(!inputNAme){
        throw "У формі не знайденно поле [name=user-name]";
    }

    const inputPassword = e.target.querySelector('[name="user-password"]');
    if(!inputPassword){
        throw "У формі не знайденно поле [name=user-password]";
    }

    const NAme = inputNAme.value.trim();
    const Password = inputPassword.value.trim();

    if(NAme.length == 0){
        inputNAme.parentNode.querySelector(".show-error").innerText = "Не должно быть пустым";
        inputNAme.classList.remove("valid");
        inputNAme.classList.add("invalid");
    }
    else if(NAme.length == 1){
        inputNAme.parentNode.querySelector(".show-error").innerText = "Nik слишком короткий";
        inputNAme.classList.remove("valid");
        inputNAme.classList.add("invalid");
    }
    else{
        inputNAme.classList.remove("invalid");
        inputNAme.classList.add("valid");
    }
    console.log(NAme);

    if(Password.length == 0){
        inputPassword.parentNode.querySelector(".show-error").innerText = "Пароль не может быть пустым!";
        inputPassword.classList.remove("valid");
        inputPassword.classList.add("invalid");
    }
    else if(Password.length<=5){
        inputPassword.parentNode.querySelector(".show-error").innerText = "Пароль должен содержать больше 5 символов!";
        inputPassword.classList.remove("valid");
        inputPassword.classList.add("invalid");
    }
    else{
        inputPassword.classList.remove("invalid");
        inputPassword.classList.add("valid");
    }
    console.log(Password);
}