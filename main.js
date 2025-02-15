var timer = document.querySelector('.timer');
var toggleBtn = document.querySelector('.toggle');
var resetBtn = document.querySelector('.reset');
var lapBtn = document.querySelector('.lap');
var lap_box = document.querySelector('.lap_box');

var watch = new Stopwatch(timer, lap_box);

function start() {
    toggleBtn.textContent = 'Stop';
    toggleBtn.classList.add("on");
    watch.start();
}

function stop() {
    toggleBtn.textContent = 'Start';
    toggleBtn.classList.remove("on");
    watch.stop();
}

toggleBtn.addEventListener('click', function () {
    watch.isOn ? stop() : start();
});

lapBtn.addEventListener('click', function () {
    if (watch.isOn) {
        watch.lapOn();
    }
});

resetBtn.addEventListener('click', function () {
    watch.reset();
    toggleBtn.textContent = 'Start';
    toggleBtn.classList.remove("on");
});

function Stopwatch(elem, lapContainer) {
    var time = 0;
    var offset;
    var interval;

    function lapOn() {
        var lapTime = lapContainer.appendChild(document.createElement("li"));
        lapTime.innerHTML = elem.textContent;
        lapTime.classList.add('lapItem');
    }

    function update() {
        if (this.isOn) {
            time += delta();
        }
        elem.textContent = timeFormatter(time);
    }

    function delta() {
        var now = Date.now();
        var timePassed = now - offset;
        offset = now;
        return timePassed;
    }

    function timeFormatter(timer) {
        let timeObj = new Date(timer);

        var minutes = timeObj.getUTCMinutes().toString().padStart(2, '0');
        var seconds = timeObj.getUTCSeconds().toString().padStart(2, '0');
        var milliseconds = timeObj.getUTCMilliseconds().toString().padStart(3, '0');

        return `${minutes}:${seconds}.${milliseconds}`;
    }

    this.start = function () {
        interval = setInterval(update.bind(this), 1);
        offset = Date.now();
        this.isOn = true;
    };

    this.stop = function () {
        clearInterval(interval);
        interval = null;
        this.isOn = false;
    };

    this.reset = function () {
        clearInterval(interval); 
        time = 0;
        lapContainer.innerHTML = ''; 
        this.isOn = false;
        elem.textContent = '00:00.000';
    };

    this.lapOn = function () {
        lapOn();
    };

    this.isOn = false;
}
