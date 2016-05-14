var timeStartHours = new Date().getHours();
var timeStartMinutes = new Date().getMinutes();

function totalDisplay() {	
    document.getElementById('total').style.display='block';
}
function timer(time) {
    var timeFinishHours = + (time[0]+time[1]);
   
    var timeFinishMinutes = + (time[3]+time[4]);
    
    timeFinishHours*=3600000;
    timeFinishMinutes*=60000;

    timeStartHours*=3600000;
    timeStartMinutes*=60000;
    var timeStart = timeStartHours + timeStartMinutes;
    var timer = timeFinishHours+timeFinishMinutes-timeStart;
    if (timer>0) {
        setTimeout(totalDisplay, timer);
    }

}


