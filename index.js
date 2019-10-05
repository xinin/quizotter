
const daysElement = document.querySelector('.days');
const hoursElement = document.querySelector('.hours');
const minutesElement = document.querySelector('.minutes');
const secondsElement = document.querySelector('.seconds');
const cluesUL = document.querySelector('#clues');
let countdown;
let countdownFail;

function displayTimeLeft(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor(((seconds % 86400) % 3600) / 60);

  daysElement.textContent = `${(days) <= 9 ? `0${days}` : days}:`;
  hoursElement.textContent = `${(hours) <= 9 ? `0${hours}` : hours}:`;
  minutesElement.textContent = `${(minutes) <= 9 ? `0${minutes}` : minutes}:`;
  secondsElement.textContent = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
}

function displayClues(seconds) {
  const daysLeft = 7 - Math.floor(seconds / 86400);
  const cluesString = [
    '<li>¿Que tienen en común estas <a target="_blank" href="./img/collage-0.png">ciudades<a/>?</li>',
    '<li>¿Y si ademas añades estas <a target="_blank" href="./img/collage-1.png">ciudades<a/>?</li>',
    '<li>Las ciudades son: <ul><li>Nueva York</li><li>Londres</li><li>Toronto</li><li>Melbourne</li><li>Hamburgo</li></ul>',
    '<li>Todo gira alrededor de un director departamental</li>',
    '<li>No me dió tiempo a verlo en Nuevo York</li>',
    '<li>Esta historia no se ha llevado a la gran pantalla</li>',
    '<li>Tiene relación con la alfarería</li>',
  ];
  cluesUL.innerHTML = cluesString.slice(0, daysLeft + 1).toString().replace(/,/g, '');
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
    displayClues(secondsLeft);
  }, 1000);
}

function download() {
  let { value } = document.querySelector('#magicword');
  const options = ['Me temo que no', 'Venga esfuerzate un poco mas', 'Creo que no', 'Te estas equivocando', 'Venga va piensa', 'Uyy casi', 'Frio frio', 'Caliente caliente'];

  if (value) {
    value = value.trim().toLowerCase().replace(/\s/g, '');
    if (/harry|potter|musical|cursed|child/.test(value)) {
      const element = document.createElement('a');
      element.setAttribute('href', './saludo.zip');
      element.setAttribute('download', 'saludo.zip');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      clearInterval(countdown);
      daysElement.textContent = '00:';
      hoursElement.textContent = '00:';
      minutesElement.textContent = '00:';
      secondsElement.textContent = '00';
    } else {
      document.querySelector('#fail').style.display = 'flex';
      document.querySelector('#fail > span').innerHTML = options[Math.floor(Math.random() * options.length)];
      clearInterval(countdownFail);
      countdownFail = setInterval(() => {
        document.querySelector('#fail').style.display = 'none';
      }, 3000);
    }
  }
}

window.onload = () => {
  timer();
  document.querySelector('#download-button').addEventListener('click', download);
};
