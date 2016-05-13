var timeStart = new Date().getMilliseconds();


function totalDisplay() {
	alert("here");
    document.getElementById('total').style.display='block';
}
function timer(time) {
    var timeFinishHours = + (time[0]+time[1]);
    var timeFinishMinutes = + (time[3]+time[4]);

    timeFinishHours*=3600000;
    timeFinishMinutes*=60000;
    var timer = timeFinishHours+timeFinishMinutes-timeStart;
    alert(timer);
    //setTimeout(func, timeFinish-timeStart);    
}


