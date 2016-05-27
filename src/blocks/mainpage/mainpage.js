(function() {
    $.ajax("/homejson", {
        success: function(data) {
            console.log(data);

            console.log(data[0].service.departureTime);

            if(!window.Notification) {
                alert("Извините, ваш браузер не разрешает отправлять вам уведомления... Советуем его")
            } else {
                console.log('it work');
            }

            var intrvlOfEnd = setInterval(function(){
                var strTimeOrd = data[3].time;
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

                var timeMe = diff/60000;



                    if ((Notification.permission === "granted") && (timeMe <=0)) {
                        var msg = new Notification("Заказ уже в пути!", {
                        body: "Ваш заказ уже выехал." + "\n" + "Примерное время доставки " + data[3].service.departureTime,
                        icon: "../images/notification/icon.png"
                });
                    }
                clearInterval(intrvlOfEnd);
                }, 10000);


            var intrv = setInterval(function() {    

            var strTimeOrd = data[3].time;
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

            var dataOrder = {
                deadline: timeMe
            }

            if (timeMe <= 10) {
                clearInterval(intrv);
                console.log("Уведомления остановлены");
            }


            if((Notification.permission === "granted") && (timeMe <=20)) {
                var msg = new Notification("Осталось совсем чуть-чуть", {
                    body: "До оформления вашего заказа осталось " + dataOrder.deadline + " минут." + "\n" + "Поспешите собрать деньги на заказ :)",
                    icon: "../images/notification/icon.png"

                });
            } else if(Notification.permission !== "denied") {
                Notification.requestPermission(function(permission) {
                    if((permission === "granted") && (timeMe <=20)) {
                        var msg = new Notification("Осталось совсем чуть-чуть", {
                            body: "До оформления вашего заказа осталось " + dataOrder.deadline + " минут." + "\n" + "Поспешите собрать деньги на заказ :)",
                            icon: "../images/notification/icon.png"

                });
                    } else {
                        console.log("Разрешение не получено или время еще не пришло...");
                    }
                });
            } else {
                console.log('Человек решил не отвечать!');
            }
        }, 300000);
        }
    })
})();