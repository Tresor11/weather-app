
function background(name) {
  const src = `../dist/asset/images/${name}.jpg`;
  const body = document.querySelector('body');
  body.style.background = `url('${src}') no-repeat`;
  body.style.backgroundSize = 'cover';
}

export default background;