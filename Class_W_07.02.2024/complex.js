document.addEventListener('DOMContentLoaded', ()=>{
    window.obj = {
        "name": "User",
        "surname": "Experienced"
    };
    updateCurrentField();
    const addFieldButton = document.getElementById("add-field-button");
    if(addFieldButton){
        addFieldButton.onclick = addFieldClick;
    }
});

function updateCurrentField()
{
    console.log(window.obj);
    const currentFields = document.getElementById("current-fields");
    if(!currentFields)
    {
        throw "Element #current-fields not found";
    }
    currentFields.innerHTML = "";
    for(let key in window.obj) // ЦІКЛ ПО ПОЛЯХ ОБЬКТУ
    {
        currentFields.innerHTML += `${key}:${window.obj[key]}<button data-key="${key}">X<button/><br/>`;
    }
    processDeleteButtons();// після додавання кнопок запускаємо процес підключення до ніх обробників подій
}

function addFieldClick()
{
    const newFieldName = document.getElementById("add-field-name");
    if(!newFieldName)
    {
        throw "Element #add-field-name not found";
    }
    const newFieldValue = document.getElementById("add-field-value");
    if(!newFieldValue)
    {
        throw "Element #add-field-value not found";
    }
    window.obj[newFieldName.value] = newFieldValue.value; 
    updateCurrentField();
    newFieldName.value = "";
    newFieldValue.value = "";
}

function processDeleteButtons(){
    const buttons = document.querySelectorAll('button[data-key]'); // всі єлементи с тегом button та атрібутом data-key довільного значення
    for(let button of buttons){ // цикл по массиву for-of
        button.onclick = deleteButtonClick;
    }
}
// hoisting - підняття оголошень - всі оголошення змінних, функцій перенояться до початку . Це робіть доступним функціі до іх оголошень (дозволяю оголошувати у доиільному місці)
function deleteButtonClick(e){ // e - повідомлення про  подію , e.target - "sender" елемент , на якому сталося подія
    const key = e.target.getAttribute("data-key"); // вилучаємо значення абрібута data-key
    // console.log(key);
    delete window.obj[key];  //видалення поля в обьекту  
    updateCurrentField(); // перерисовка блоку що відібражає наявні поля

}
    