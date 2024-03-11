function infoPerson() {

    const userInputs_name = document.getElementById("name");
    const userInputs_surname = document.getElementById("surname");

    if(!userInputs_name)
    {
        throw "Елимент 'Имя не найден' !";
    }
    else if(!userInputs_surname)
    {
        throw "Елимент 'Фамилия не найден' !";
    }

    const name_Person = userInputs_name.value;
    const surname_Person = userInputs_surname.value;

    if(!name_Person || !surname_Person)
    {
        alert("Введите пж имя или фамилию!");
        return;
    }

    const outputInfo = document.getElementById("show_info");
    if(!outputInfo)
    {
        throw "Елимент для вывода не найден !";
    }
    outputInfo.innerHTML =`Имя: ${name_Person}, Фамилия: ${surname_Person}`;
}