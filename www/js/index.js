
var app = {
    // WIO Node Websocket TOKEN
    toke: '<PUT TOKEN HEREclea>',
    wioURL: 'wss://us.wio.seeed.io/v1/node/event',
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent();
    },

    // Update DOM on a Received Event
    receivedEvent: function () {
        const detecting = document.querySelector('.listen');
        const alarm = document.querySelector('.alarm');
        const audio = document.querySelector('audio');

        let dataReceive = false;
        detecting.classList.add('show');

        const ws = new WebSocket(this.wioURL);
        ws.onopen = function () {
            ws.send(this.toke);
        };
        ws.onmessage = function (evt) {
            if (!dataReceive) {
                detecting.classList.remove('show');
                document.body.classList.add('alarm');
                alarm.classList.add('show');
                audio.play();
                dataReceive = true;
                setTimeout(() => {
                    dataReceive = false;
                    detecting.classList.add('show');
                    document.body.classList.remove('alarm');
                    alarm.classList.remove('show');
                    audio.pause();
                }, 10000);
            }
        };
    }
};

app.initialize();