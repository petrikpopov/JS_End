document.addEventListener('DOMContentLoaded', () => {
    $("#local-button").click(localButtonClick);
    $("#session-button").click(sessionButtonClick);
    window.timedrop = document.getElementById('session-timer');
    let saved = localStorage.getItem("saved");

    if (saved) {
        $("#local-input").val(saved)
    }
    $("#local-delete").click(_ => {
        localStorage.removeItem("saved");
        $("#local-input").val("")
    });
    $("#session-delete").click(_ => {
        sessionStorage.removeItem("saved");
        $("#session-input").val("")
    });
    setInterval(timerTick, 1000);
});

function sessionButtonClick() {
    sessionStorage.setItem("saved", $("#session-input").val());
    sessionStorage.setItem(
        "moment",
        new Date()
    );
}

function localButtonClick() {
    localStorage.setItem(
        "saved",
        $("#local-input").val()
    );
    localStorage.setItem(
        "moment",
        new Date()
    );
}

function timerTick() {
    var currentTime = new Date();
    var timeValue = window.timedrop.value;
    let savedMoment = localStorage.getItem("moment");
    let sessionMoment = sessionStorage.getItem("moment");
    if (savedMoment) {
        let moment = new Date(localStorage.getItem("moment"));
        let period = (new Date().getTime() - moment.getTime()) / 1000;
        $("#local-period").text(Math.round(period));
        const currentHourMinute = currentTime.getHours() * 60 + currentTime.getMinutes();
        const inputHourMinute = parseInt(timeValue.split(':')[0]) * 60 + parseInt(timeValue.split(':')[1]);
        if (currentHourMinute >= inputHourMinute) {
            localStorage.removeItem("saved");
            localStorage.removeItem("moment");
            localButtonClick();
            period = 0;
            window.timedrop.value = null;
        }
    }
    else{
        $("#local-period").text("---");
    }
    if (sessionMoment) {
        let moment = new Date(sessionStorage.getItem("moment"));
        let period = (new Date().getTime() - moment.getTime()) / 1000;
        $("#session-period").text(Math.round(period));
        const currentHourMinute = currentTime.getHours() * 60 + currentTime.getMinutes();
        const inputHourMinute = parseInt(timeValue.split(':')[0]) * 60 + parseInt(timeValue.split(':')[1]);
        if (currentHourMinute > inputHourMinute) {
            sessionStorage.removeItem("saved");
            sessionStorage.removeItem("moment");
            sessionButtonClick();
            period = 0;
            window.timedrop.value = null;
        }
    }
    else {
        $("#session-period").text("---");
    }
}