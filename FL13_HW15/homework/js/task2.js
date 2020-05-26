const DELAY_DRIVE = 2000;
const DELAY_STOP = 1500;

function Vehicle(color, engine) {
    this.color = color;
    this.engine = engine;
    this.maxSpeed = 70;
    this.currentSpeed = 0;
    this.maxDrivingSpeed = 0;
    this.timer = 0;
    this.stopped = false;
    this.started = false;
    this.showMessageStop = () => {
        console.log('Vehicle is stopped. Maximum speed during the drive was ' + this.maxDrivingSpeed);
    }
}

Vehicle.prototype.upgradeEngine = function (newEngine, maxSpeed) {
    if (!this.currentSpeed) {
        this.engine = newEngine;
        this.maxSpeed = maxSpeed;
    }
}

Vehicle.prototype.getInfo = function () {
    const objectInfo = {};
    objectInfo.engine = this.engine;
    objectInfo.color = this.color;
    objectInfo.maxSpeed = this.maxSpeed;
    objectInfo.model = this.model === undefined ? 'unknown model' : this.model;
    console.log(objectInfo);
}

Vehicle.prototype.drive = function () {
    if (this.started) {
        console.log('Already driving');
    } else {
        this.started = true;
        this.stopped = false;
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.currentSpeed += 20;
            console.log(this.currentSpeed);
            if (this.maxSpeed < this.currentSpeed) {
                console.log('speed is too high, SLOW DOWN!');
            }
        }, DELAY_DRIVE);
    }
}


Vehicle.prototype.stop = function () {
    if (this.stopped) {
        console.log('Already slows down');
    } else {
        this.maxDrivingSpeed = this.currentSpeed > this.maxDrivingSpeed ? this.currentSpeed : this.maxDrivingSpeed;
        this.stopped = true;
        this.started = false;
        clearInterval(this.timer);
        if (this.currentSpeed) {
            this.timer = setInterval(() => {
                this.currentSpeed -= 20;
                if (this.currentSpeed === 0) {
                    this.showMessageStop();
                    clearInterval(this.timer);
                } else {
                    console.log(this.currentSpeed);
                }
            }, DELAY_STOP);
        }
    }
}

function Car(color, engine, model) {
    Vehicle.call(this);
    this.color = color;
    this.engine = engine;
    this.model = model;
    this.maxSpeed = 80;
    this.changeColor = (newColor) => {
        if (this.color === newColor) {
            console.log('The selected color is the same as the previous, please choose another one');
        } else {
            this.color = newColor;
        }
    }
    this.showMessageStop = () => {
        console.log(`Car ${this.model} is stopped. Maximum speed during the drive ${this.maxDrivingSpeed}`)
    }

}

Car.prototype = Object.create(Vehicle.prototype);

function Motorcycle(color, engine, model) {
    Vehicle.call(this);
    this.color = color;
    this.engine = engine;
    this.model = model;
    this.maxSpeed = 90;
    this.showMessageStop = () => {
        console.log(`Motorcycle ${this.model} is stopped. Good drive`);
    }
    this.drive = function () {
        if (this.started) {
            console.log('Already driving');
        } else {
            console.log('Let\'s drive')
            this.started = true;
            this.stopped = false;
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.currentSpeed += 20;
                console.log(this.currentSpeed);
                if (this.maxSpeed < this.currentSpeed) {
                    console.log('speed is too high, SLOW DOWN!');
                }
                if (this.currentSpeed - this.maxSpeed >= 30) {
                    console.log('Engine overheating');
                    this.stop();
                }
            }, DELAY_DRIVE);
        }
    }
}

Motorcycle.prototype = Object.create(Vehicle.prototype);

