document.onsubmit = function(e){
    e.preventDefault(); // зупинка обробки за замовченням 
    // дістаємо єлементи форми

    const userNameInput = e.target.querySelector('[name="user-name"]');
    if(!userNameInput){
        alert('У формі не знайденно поле [name="user-name"]');
        return;
    }
    const userName = userNameInput.value.trim();
    if(userName.length == 0){
        userNameInput.parentNode.querySelector(".error-message").innerText = "Не должно быть пустым";
        userNameInput.classList.remove("valid");
        userNameInput.classList.add("invalid");
        
    }
    else if(userName.length == 1){
        userNameInput.parentNode.querySelector(".error-message").innerText = "Занадто коротке!";
        userNameInput.classList.remove("valid");
        userNameInput.classList.add("invalid");
    }
    else{
        userNameInput.classList.remove("invalid");
        userNameInput.classList.add("valid");
    }
    console.log(userName);

    const userPasswodInput = e.target.querySelector('[name="user-password"]');
    if(!userNameInput){
        alert('У формі не знайденно поле [name="user-password"]');
        return;
    }
    const userPasswod = userPasswodInput.value;
    console.log(userPasswod);
   
}

// document.onsubmit = function(e){
//     e.preventDefault(); // Зупинка обробки за замовченням 
//     // Дістаємо єлементи форми

//     const userNameInput = e.target.querySelector('[name="user-name"]');
//     if(!userNameInput){
//         alert('У формі не знайденно поле [name="user-name"]');
//         return;
//     }
//     const userName = userNameInput.value.trim();
//     if(userName.length == 0){
//         userNameInput.closest("label").classList.add("invalid");
//     } else {
//         userNameInput.closest("label").classList.remove("invalid");
//     }
//     console.log(userName);

//     const userPasswordInput = e.target.querySelector('[name="user-password"]');
//     if(!userPasswordInput){
//         alert('У формі не знайденно поле [name="user-password"]');
//         return;
//     }
//     const userPassword = userPasswordInput.value;
//     console.log(userPassword);
// }
