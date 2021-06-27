let boxWidth = 50;
let boxHeight = 50;
let units = 'px';
let r = null;
let g = 200;
let b = [200,250];


let randomInt = (min, max) => {
  return min + Math.floor(Math.random() * (max-min));
};

/**
 * Generates a random hex color, if r,g or b is given, the value will be used.
 * @param {int} r Red value.
 * @param {int} g Green value.
 * @param {int} b Blue value.
 * @returns string containing the hex value of the generated color.
 */
let generateRandomColor = (r, g, b) => {
  let rgb = [r, g, b];
  rgb.forEach((v,idx,arr) => {
    v = Number.isInteger(arr[idx]) ?
          arr[idx] :
          Array.isArray(arr[idx]) && arr[idx].length == 2 ?
            randomInt(arr[idx][0], arr[idx][1]) :
            null;
    v = v && v < 0 ? Math.abs(v) : v;
    v = v && v > 255 ? 255 : v;
    v = v ?? randomInt(0, 255);
    arr[idx] = v < 16 ? `0${v.toString(16)}` : v.toString(16);
  });
  let color = `#${rgb[0]}${rgb[1]}${rgb[2]}`;
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
