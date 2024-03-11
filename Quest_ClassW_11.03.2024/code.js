function loadQuestions(){
    return [
        "Питання один",
        "Питання два",
        "Питання три",
        "Питання чотири",
    ];
}

async function generateTable(questions){
    let res = '<table class="quest-table">';
    let n = 1;
    for(let quest of questions){
        res+=`<tr data-quest="${n}">
            <td>${n}. ${quest}</td>
            <td><input id="quest-radio-${n}1" value="negative" name="quest-radio${n}" type="radio"><label for="quest-radio-${n}1">:(</label></td>
            <td><input id="quest-radio-${n}2" value="neutral" name="quest-radio${n}" type="radio"><label for="quest-radio-${n}2">:|</label></td>
            <td><input id="quest-radio-${n}3" value="positive" name="quest-radio${n}" type="radio"><label for="quest-radio-${n}3">:|</label></td>
            <td><input id="quest-radio-${n}4" value="bad" name="quest-radio${n}" type="radio"><label for="quest-radio-${n}4">:)</label></td>
        </tr>`
        n+=1;
    }
    res+="</table><button onclick='doneClick()'>Готовo</button>";
    return res;
}

document.addEventListener('DOMContentLoaded', function(){
    generateTable(loadQuestions())
    .then(html=>document.getElementById("table-container").innerHTML = html);
});

function doneClick(){
    const questElements = document.querySelectorAll('[data-quest]');
    let resultat = [];
    let bezOtveta = [];
    for(let quest of questElements){
        let n = quest.getAttribute('data-quest');
        let name = `quest-radio${n}`;
        let radioButton = quest.querySelector(`input[name="${name}"]:checked`);
        if(radioButton==null){
            bezOtveta.push(n);
        }
        // if(radioButton==null){
        //     alert('Вы забыли дать ответ на вопрос:' + n);
        //     return;
        // }
        // else{
        //     resultat.push({
        //         "question": n,
        //         "answer": radioButton.value
        //     });
        // }
        
    }
    if(bezOtveta.length>0){
        let message = 'Вы забыли дать ответ на следующие вопросы:\n';
        bezOtveta.forEach(question=>{
            message += `- ${question}\n`;
        });
        alert(message);
    }
    console.log(resultat);
}