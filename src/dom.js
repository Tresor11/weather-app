import background from './helper';

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
const temp = dom.getElement('temp');
const humidity = dom.getElement('humidity');
const wind = dom.getElement('wind');
const description = dom.getElement('description');
const img = dom.getElement('img');

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
    humidity.innerText = data.main.humidity;
    img.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    dom.hideAlert();
    background(data.weather[0].main);
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

export default async function search() {
  return getData();
}