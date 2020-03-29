function background(name) {
  const src = `../dist/asset/images/${name}.jpg`;
  const body = document.querySelector('body');
  body.style.background = `url('${src}') no-repeat`;
  body.style.backgroundSize = 'cover';
}

function currentDate() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
  const d = new Date();
  return `${days[d.getDay() - 1]}, ${d.getDate()} ${months[d.getMonth()]}`;
}

export { background, currentDate };