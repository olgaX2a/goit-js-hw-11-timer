class CountdownTimer {
    constructor({ selector, targetDate }) {
        this.selector = selector;
        this.targetDate = targetDate;
    }

    getRefs = () => {
        this.selectorRef = document.querySelector(this.selector);
        this.refs = {
            days: this.selectorRef.querySelector('[data-value="days"]'),
            hours: this.selectorRef.querySelector('[data-value="hours"]'),
            mins: this.selectorRef.querySelector('[data-value="mins"]'),
            secs: this.selectorRef.querySelector('[data-value="secs"]'),
        };
    };

    initCountdown = () => {
        this.renderMarkup();
        this.intervalId = setInterval(() => {
            this.renderMarkup()
        }, 1000)
    }

    stopCountdown = () => {
        clearInterval(this.intervalId);
        this.intervalId = null;
        const zerosToRender = this.getCountdownData(0);
        this.renderCountdownData(zerosToRender);
    }
    renderMarkup = () => { 
            const remainingTime = this.getRemainingTime();
            const timeToRender = this.getCountdownData(remainingTime);
            this.renderCountdownData(timeToRender);
            if (Math.floor(remainingTime / 1000) <= 0) {
                this.stopCountdown();
            }
    }

    getCountdownData = time => {
        const days =  Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((time % (1000 * 60)) / 1000);
        return { days, hours, mins, secs };
    };

    getRemainingTime = () => this.targetDate - Date.now();
    renderCountdownData = (timeToRender) => {
        const { days, hours, mins, secs } = timeToRender;
        this.getRefs();
            this.refs.days.textContent = days < 10 ? `0${days}` : days;
            this.refs.hours.textContent = hours < 10 ? `0${hours}` : hours;
            this.refs.mins.textContent = mins < 10 ? `0${mins}` : mins;
            this.refs.secs.textContent = secs < 10 ? `0${secs}` : secs;
        };
        
}

const countdown = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('May 31, 2022'),
});

countdown.initCountdown();

