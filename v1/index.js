
const daysElement = document.querySelector('.days');
const hoursElement = document.querySelector('.hours');
const minutesElement = document.querySelector('.minutes');
const secondsElement = document.querySelector('.seconds');
const cluesUL = document.querySelector('#clues');
let countdown;
let countdownFail;

let done = false;

function displayTimeLeft(seconds) {
  daysElement.textContent = `${Math.floor(seconds / 86400)}:`;
  hoursElement.textContent = `${Math.floor((seconds % 86400) / 3600)}:`;
  minutesElement.textContent = `${Math.floor(((seconds % 86400) % 3600) / 60)}:`;
  secondsElement.textContent = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
}

function displayClues(seconds) {
  if (!done) {
    const daysLeft = 27 - Math.floor(seconds / 86400);
    const cluesString = [
      '<li>¿Que tienen en común estas <a target="_blank" href="./img/collage-0.png">ciudades<a/>?</li>',
      '<li>¿Y si ademas añades estas <a target="_blank" href="./img/collage-1.png">ciudades<a/>?</li>',
      '<li>Las ciudades son: <ul><li> Nueva York</li><li> Londres</li><li> Toronto</li><li> Melbourne </li><li> Hamburgo</li></ul>',
      '<li>No me dió tiempo a hacerlo en Nuevo York</li>',
      '<li>La duración es similar a un año escolar</li>',
      '<li></li>',
      '<li></li>',
    ];
    cluesUL.innerHTML = cluesString.slice(0, daysLeft + 1).toString().replace(/,/g, '');
    done = true;
  }
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
