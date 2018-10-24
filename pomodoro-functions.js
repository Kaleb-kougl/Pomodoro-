$(document).ready(function(){
    const SESSION = "Session";
    const BREAK = "Break";
    let sessionLength = 25;
    let breakLength = 5;
    let paused = false;
    let timerStarted = false;
    let minutesLeft = 25;
    let secondsLeft = 0;
    let timerFunction;
    let currentlySession = true;

    $("#break-increment").click(function() {
        if (breakLength < 60) {
            breakLength++;
        }
    });

    $("#break-decrement").click(function() {
        if (breakLength != 1) {
            breakLength--;
        }
    });

    $("#session-increment").click(function() {
        if (sessionLength < 60) {
            sessionLength++;
        }
        if (!timerStarted){
            changeDisplayedTimeLeft()
        }
    });

    $("#session-decrement").click(function() {
        if (sessionLength != 1) {
            sessionLength--;
        }
        if (!timerStarted){
            changeDisplayedTimeLeft()
        }
    });

    $('button').click(function() {
        document.getElementById("break-length").innerHTML = breakLength;
        document.getElementById("session-length").innerHTML = sessionLength;
        if (currentlySession && !timerStarted) {
            minutesLeft = sessionLength;
            changeDisplayedTimeLeft();
        } else if (!currentlySession && !timerStarted) {
            minutesLeft = breakLength;
            changeDisplayedTimeLeft();
        }
    });

    $('#start_stop').click(function() {
        paused = !paused;
        startTimer();
    });

    $('#reset').click(function() {
        if (paused) {
            clearInterval(timerFunction);
            paused = !paused
        }
        sessionLength = 25;
        breakLength = 5;
        minutesLeft = sessionLength;
        secondsLeft = 0;
        timerStarted = false;
        currentlySession = true;

        document.getElementById("break-length").innerHTML = breakLength;
        document.getElementById("session-length").innerHTML = sessionLength;

        let audio = document.getElementById('beep');
        audio.pause();
        audio.currentTime = 0;

        changeDisplayedTimeLeft();
    });

    function startTimer() {
        timerStarted = true;
        if (paused) {
            timerFunction = setInterval(timing, 1000);
        } else {
            clearInterval(timerFunction);
        };
    }

    function timing() {
        if (secondsLeft == 0 && minutesLeft == 0) {
            switchInterval();
        }
        if (secondsLeft == 0) {
            minutesLeft--;
            secondsLeft = 59;
        } else {
            secondsLeft--;
        }

        changeDisplayedTimeLeft();
    }

    function changeDisplayedTimeLeft() {
        let temp = pad(minutesLeft) + ":" + pad(secondsLeft);

        document.getElementById("time-left").innerHTML = temp;
        if (currentlySession) {
            document.getElementById('timer-label').innerHTML = SESSION;
        } else {
            document.getElementById('timer-label').innerHTML = BREAK;
        }
    }

    function pad(time) {
        return (time < 10) ? '0' + time.toString() : time;
    }

    function switchInterval() {
        currentlySession = !currentlySession;
        let audio = document.getElementById('beep');
        audio.play();
        if (currentlySession) {
            minutesLeft = sessionLength;
            secondsLeft++;
        } else {
            minutesLeft = breakLength;
            secondsLeft++;
        }
        changeDisplayedTimeLeft();
    }

});