(function() {
    $.ajax("/homejson", {
        success: function(data) {
            console.log(data);

            var strTimeOrd = data[0].time;
            var now = new Date();
            var timeOfOrder = new Date();

            var hours = strTimeOrd[0] + strTimeOrd[1];
            var min = strTimeOrd[3] + strTimeOrd[4];

            var nhours = parseInt(hours);
            var nmin = parseInt(min);

            console.log(nhours);
            console.log(nmin);

            timeOfOrder.setHours(nhours);
            timeOfOrder.setMinutes(nmin);

            var nowMLS = now.getTime();
            var timeOfOrderMLS = timeOfOrder.getTime();

            var diff = timeOfOrderMLS - nowMLS;

            console.log(diff/60000);

            var timeMe = diff/60000;


            if(!window.Notification) {
                alert("Извините, ваш браузер не разрешает отправлять вам уведомления... Советуем его")
            } else {
                console.log('it work');
            }
            var intrv = setInterval(function() {      
            if((Notification.permission === "granted") && (timeMe <=18)) {

                var msg = new Notification("test");
            } else if(Notification.permission !== "denied") {
                Notification.requestPermission(function(permission) {
                    if((permission === "granted") && (timeMe <=18)) {
                        var msg = new Notification('test1');
                    } else {
                        console.log("Разрешение не получено или время еще не пришло...");
                    }
                });
            } else {
                console.log('Человек решил не отвечать!');
            }
        }, 180000);
        }
    })
})();