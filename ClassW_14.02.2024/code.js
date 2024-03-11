document.onsubmit = function(e){
    e.preventDefault(); // зупинка обробки за замовченням 
    // дістаємо єлементи форми

    const userNameInput = e.target.querySelector('[name="user-name"]');
    if(!userNameInput){
        alert('У формі не знайденно поле [name="user-name"]');
        return;
    }

    const userName = userNameInput.value.trim();
    let data = {inputElement : userNameInput, message: "Успешно!", isError: false};
    if(userName.length == 0){
        data.message = "Не может быть пустым!";
        data.isError = true;
    }
    else if(userName.length == 1){
        data.message = "Имя слишком короткое!";
        data.isError = true;
    }
    else{
        let regionEng = /^[A-Z][a-z]+(\s+[A-Z][a-z]+)*$/;
        let regionUk = /^[А-ЯІЄ][а-яiє']*(\s+[А-ЯІЄ][а-яiє']+)*$/;

        if(!regionEng.test(userName) && !regionUk.test(userName)){
            data.message = "Должна начинаться с большой буквы!";
            data.isError = true;
        }
        
    }
    setHelperMessage(data);

    console.log(userName);

    /////////////////////////////////////////////////
    const userPasswodInput = e.target.querySelector('[name="user-password"]');
    let myR = /(.*[a-z]+)(.*[A-Z]+)(.*[\d+])(.*[\W+])/ ;
    if(!userPasswodInput){
        alert('У формі не знайденно поле [name="user-password"]');
        return;
    }
    const userPasswod = userPasswodInput.value;
    data = {inputElement : userPasswodInput, message: "Успешно!", isError: false};
    if(userPasswod.length == 0){
        data.message = "Не может быть пустым!";
        data.isError = true;
    }
    else if(userPasswod.length == 1){
        data.message = "Пароль короткий!";
        data.isError = true;
    }
    else{
       
        if(!myR.test(userPasswod)){
            data.message = "Має містити цифру, велику літеру, спец-символ!";
            data.isError = true
        } 
        else{
            data.message = "Проходить";
            data.isError = false
        }
    }  
    setHelperMessage(data);
    // console.log(userPasswod);

    // #r-password
    const userReapetInput = e.target.querySelector('[name="user-reapetpassword"]');
    if(!userReapetInput){
        alert('У формі не знайденно поле [name="user-reapetpassword"]');
        return;
    }
    const userRepeatPassword = userReapetInput.value;
    data = {inputElement : userReapetInput, message: "Успешно!", isError: false};
    if(userRepeatPassword.length == 0){
        data.message = "Не может быть пустым!";
        data.isError = true;
    }
    else if(userRepeatPassword.length == 1){
        data.message = "Пароль короткий!";
        data.isError = true;
    }
    else{
       
        if(!myR.test(userRepeatPassword)){
            data.message = "Має містити цифру, велику літеру, спец-символ!";
            data.isError = true;
        } 
        else{
            data.message = "Проходить";
            data.isError = false
        }
    }
    // checkPasswordMatch(userPasswodInput, userReapetInput);
    setHelperMessage(data);
    // #r-password

    /////////////////////////////////////////////////

    // #phone
    const userPhoneInput = e.target.querySelector('[name="user-phone"]');
    if(!userPasswodInput){
        alert('У формі не знайденно поле [name="user-phone"]');
        return;
    }
    let userPhone = userPhoneInput.value;
    data = {inputElement : userPhoneInput, message: "Успешно!", isError: false};
    if(userPhone.length == 0){
        data.message = "Не может быть пустым!";
        data.isError = true;
    }
    else if(userPhone.length == 1){
        data.message = "Пароль короткий!";
        data.isError = true;
    }
    else{
        // let reg = /^\d{6,10}$/; только от 6 до 10 
        // let reg = /^\d(-?\d){5,9}$/; // разрешается - пред каждой цифрой (кроме первой)
        // let reg = /^\d([-\s]?\d){5,9}$/; разрешается или " " или "-" перед каждой цифром (кроме первого)
        userPhone =  userPhone.replace(/\D+/g, "");
        let reg = /^\d{6,10}$/;
        if(!reg.test(userPhone)){
            data.message = "Телефон не коректный, должен быть от 6 до 10 символов";
            data.isError = true;
        }
        else{
            userPhoneInput.value = userPhone; // мой телефон - (098) 765 43 21(домашний)
        }
    }
    setHelperMessage(data);
    // #phone

    // #email
    const userEmailInput = e.target.querySelector('[name="user-email"]');
    if(!userPasswodInput){
        alert('У формі не знайденно поле [name="user-email"]');
        return;
    }
    const userEmail = userEmailInput.value;
    data = {inputElement : userEmailInput, message: "Успешно!", isError: false};
    if(userEmail.length == 0){
        data.message = "Не может быть пустым!";
        data.isError = true;
    }
    else if(userEmail.length == 1){
        data.message = "Пароль короткий!";
        data.isError = true;
    }
    setHelperMessage(data);
    // #amail

    // #amail

    // #r-bir
    const userBirthdayInput = e.target.querySelector('[name="user-birthday"]');
    if(!userReapetInput){
        alert('У формі не знайденно поле [name="user-birthday"]');
        return;
    }
    const userBirthday= userBirthdayInput.value;
    data = {inputElement : userBirthdayInput, message: "Успешно!", isError: false};
    if(userBirthday.length == 0){
        data.message = "Не может быть пустым!";
        data.isError = true;
    }
    else if(userBirthday.length == 1){
        data.message = "Пароль короткий!";
        data.isError = true;
    }
    setHelperMessage(data);
    // #bir

    // вызов функции которая проверяет пароль и его повтор
    // checkPasswordMatch(userPasswodInput, userReapetInput);
    //
   
}

function setHelperMessage({inputElement, message ,isError}){
  
  const helper = inputElement.parentNode.querySelector(".helper-text");
  if(isError){
    helper.setAttribute("data-error",message);
    inputElement.classList.remove("valid");
    inputElement.classList.remove("validate");
    inputElement.classList.add("invalid");
  }
  else{
    helper.setAttribute("data-success",message);
    inputElement.classList.remove("invalid");
    inputElement.classList.remove("validate");
    inputElement.classList.add("valid");
  }
 
}

function checkPasswordMatch(passwordInput, repeatPasswordInput) {

    const password = passwordInput.value;
    const repeatPassword = repeatPasswordInput.value;

    const passwordHelper = passwordInput.parentNode.querySelector(".helper-text");
    const repeatPasswordHelper = repeatPasswordInput.parentNode.querySelector(".helper-text");

    if (password != repeatPassword) {
       
        passwordHelper.setAttribute("data-error", "Пароли не совпадают");
        repeatPasswordHelper.setAttribute("data-error", "Пароли не совпадают");
        
        passwordInput.classList.remove("valid");
        passwordInput.classList.remove("validate");
        passwordInput.classList.add("invalid");

        repeatPasswordInput.classList.remove("valid");
        repeatPasswordInput.classList.remove("validate");
        repeatPasswordInput.classList.add("invalid");

        console.log("ERROR");
    }
    else{
        passwordHelper.setAttribute("data-success", "Пароли совпадают");
        repeatPasswordHelper.setAttribute("data-success", "Пароли совпадают");

        passwordInput.classList.remove("invalid");
        passwordInput.classList.remove("validate");
        passwordInput.classList.add("valid");

        repeatPasswordInput.classList.remove("invalid");
        repeatPasswordInput.classList.remove("validate");
        repeatPasswordInput.classList.add("valid");

        // console.log("Ok");
    }
    
}
