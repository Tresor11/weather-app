import { background, currentDate } from './helper';

// eslint-disable-next-line func-names
const dom = (function () {
  function getElement(id) {
    return document.getElementById(id);
  }
  function render(id, cont) {
    getElement(id).textContent = cont;
  }
  function getValue(id) {
    return getElement(id).value;
  }
  function showAlert() {
    getElement('alert').style.display = 'block';
  }
  function hideAlert() {
    getElement('alert').style.display = 'none';
  }
  return {
    getElement,
    render,
    getValue,
    showAlert,
    hideAlert,
  };
}());

const city = dom.getElement('city');
const country = dom.getElement('country');
const temp = dom.getElement('temp');
const humidity = dom.getElement('humidity');
const wind = dom.getElement('wind');
const description = dom.getElement('description');
const img = dom.getElement('img');
const date = dom.getElement('date');
let metrics = true;
const convBtn = dom.getElement('convert');
const currentTemp = dom.getElement('temp');
const unit = dom.getElement('unit');

async function getData(term = 'canada') {
  const key = 'b5ed054d1747afb3b139aafeac6bf446';
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${term}&units=metric&APPID=${key}`;
  const response = await fetch(url, { mode: 'cors' });
  let data = '';
  try {
    data = await response.json();
    description.innerText = data.weather[0].description;
    wind.innerText = data.wind.speed;
    temp.innerText = (data.main.temp).toFixed(1);
    city.innerText = data.name;
    country.innerText = data.sys.country;
    humidity.innerText = data.main.humidity;
    unit.innerText = 'C';
    convBtn.innerHTML = '&#176;F';
    metrics = true;
    img.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    dom.hideAlert();
    background(data.weather[0].main);
    date.innerText = currentDate();
    return true;
  } catch (err) {
    dom.showAlert();
    return false;
  }
}
dom.getElement('search').addEventListener('click', () => {
  const search = dom.getElement('input').value;
  getData(search);
});

function convert() {
  if (metrics) {
    const temp = Number(currentTemp.innerText);
    const newTemp = (((9 / 5) * temp) + 32).toFixed(1);
    unit.innerText = 'F';
    convBtn.innerHTML = '&#176;C';
    currentTemp.innerText = newTemp;
  } else {
    const temp = Number(currentTemp.innerText);
    const newTemp = ((temp - 32) * (5 / 9)).toFixed(1);
    unit.innerText = 'C';
    convBtn.innerHTML = '&#176;F';
    currentTemp.innerText = newTemp;
  }
  metrics = !metrics;
}
convBtn.addEventListener('click', convert);

async function search() {
  return getData();
}

export { dom, search };
