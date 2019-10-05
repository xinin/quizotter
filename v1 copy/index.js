
const daysElement = document.querySelector('.days');
const hoursElement = document.querySelector('.hours');
const minutesElement = document.querySelector('.minutes');
const secondsElement = document.querySelector('.seconds');
let countdown;
let countdownFail;

function displayTimeLeft(seconds) {
  daysElement.textContent = Math.floor(seconds / 86400);
  hoursElement.textContent = Math.floor((seconds % 86400) / 3600);
  minutesElement.textContent = Math.floor(((seconds % 86400) % 3600) / 60);
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

function download() {
  let { value } = document.querySelector('#magicword');
  const options = ['Me temo que no', 'Venga esfuerzate un poco mas', 'Creo que no estas entendiendo el juego'];

  if (value) {
    value = value.trim().toLowerCase().replace(/\s/g, '');
    if (/harry|potter|musical|cursed|child/.test(value)) {
      const element = document.createElement('a');
      element.setAttribute('href', 'http://localhost:8080/img/collage.png');
      element.setAttribute('download', 'saludo.zip');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } else {
      document.querySelector('#fail').style.display = 'flex';
      document.querySelector('#fail > span').innerHTML = options[Math.floor(Math.random() * options.length)];
      clearInterval(countdownFail);
      countdownFail = setInterval(() => {
        document.querySelector('#fail').style.display = 'none';
      }, 1000);
    }
  }
}

window.onload = () => {
  timer();
  document.querySelector('#download-button').addEventListener('click', download);
};
