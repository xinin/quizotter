
const daysElement = document.querySelector('.days');
const hoursElement = document.querySelector('.hours');
const minutesElement = document.querySelector('.minutes');
const secondsElement = document.querySelector('.seconds');
let countdown;

function displayTimeLeft(seconds) {
  daysElement.textContent = Math.floor(seconds / 86400);
  hoursElement.textContent = Math.floor((seconds % 86400) / 3600);
  minutesElement.textContent = Math.floor((seconds % 86400) % 3600 / 60);
  secondsElement.textContent = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
}

function timer() {
  const then = new Date(2019, 9, 20, 23, 59, 59, 59);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft <= 0) {
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}


window.onload = () => {
  timer();
};
