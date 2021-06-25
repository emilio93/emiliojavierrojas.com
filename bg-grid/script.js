let boxWidth = 50;
let boxHeight = 50;
let units = 'px';
let r = null;
let g = 180;
let b = null;

/**
 * Generates a random hex color, if r,g or b is given, the value will be used.
 * @param {int} r Red value.
 * @param {int} g Green value.
 * @param {int} b Blue value.
 * @returns string containing the hex value of the generated color.
 */
let generateRandomColor = (r, g, b) => {
  r = Number.isInteger(r) ? r : null;
  g = Number.isInteger(g) ? g : null;
  b = Number.isInteger(b) ? b : null;

  if (r && r < 0) r = Math.abs(r);
  if (g && g < 0) g = Math.abs(g);
  if (b && b < 0) b = Math.abs(b);

  if (r && r > 255) r = 255;
  if (g && g > 255) g = 255;
  if (b && b > 255) b = 255;

  r = r ?? Math.floor(Math.random() * 255);
  g = g ?? Math.floor(Math.random() * 255);
  b = b ?? Math.floor(Math.random() * 255);
  let color = "#";
  color = `${color}${r < 16 ? '0' : ''}${r.toString(16)}`;
  color = `${color}${g < 16 ? '0' : ''}${g.toString(16)}`;
  color = `${color}${b < 16 ? '0' : ''}${b.toString(16)}`;
  return color;
};

/**
 * Generates a single box with random background color.
 * @param {int} width Width of box.
 * @param {int} height Height of box.
 * @param {string} units Units of measure.
 * @returns Generated element.
 */
let generateBox = (width = 100, height = 100, units = 'px') => {
  let box = document.createElement("div");
  box.style.flex = `0 0 ${width}${units}`;
  box.style.height = `${height}${units}`;
  box.style.background = generateRandomColor(r, g, b);
  return box;
};

/**
 * Generates a row of boxes of random colors.
 * @param {int} width Width of boxes within the container.
 * @param {int} height Height of the boxes within the container.
 * @param {string} units Units of measure.
 * @returns
 */
let generateBoxContainer = (width = 100, height = 100, units = 'px') => {
  let boxContainer = document.createElement("div");
  boxContainer.style.display = "flex";
  for (let i = 0; i < getRepeats().horizontal; i++) {
    boxContainer.appendChild(generateBox(width, height, units));
  }
  return boxContainer;
};

/**
 * Obtains the estimated required boxes quantity for a single render.
 * @returns Estimated required repeats for a single render of boxes.
 */
let getRepeats = () => {
  let width = Math.max(window.innerWidth, window.screen.availWidth);
  let height = Math.max(window.innerHeight, window.screen.availHeight);
  return {
    'horizontal': Math.ceil(width / boxWidth),
    'vertical': Math.ceil(height / boxHeight)
  };
};

/**
 * Obtains the quantity of currently rendered boxes.
 * @returns Quantity of rendered boxes.
 */
let getBoxCount = () => {
  let bg = document.getElementById("bg");
  return {
    'horizontal': bg.firstChild.childElementCount,
    'vertical': bg.childElementCount
  };
};

/**
 * Renders the background with boxes of random colors.
 */
let updateBackground = () => {
  let bg = document.getElementById("bg");
  bg.innerHTML = "";
  for (let i = 0; i < getRepeats().vertical; i++) {
    bg.appendChild(generateBoxContainer(boxWidth, boxHeight, units));
  }
};

// Check if re-render is required given the resize measures.
window.onresize = () => {
  if (getBoxCount().horizontal >= getRepeats().horizontal) {
    if (getBoxCount().vertical >= getRepeats().vertical) {
      return;
    }
  }
  updateBackground();
};

// Initial render
document.addEventListener("DOMContentLoaded", updateBackground);
