class BgBoxComponent extends React.Component {
  constructor(props) {
    super(props);

    const hex1 = [72, 72, 200];
    const off1 = [20, 20, 0];
    const rgb1 = [[hex1[0] - off1[0], hex1[0] + off1[0]], [hex1[1] - off1[1], hex1[1] + off1[1]], [hex1[2] - off1[2], hex1[2] + off1[2]]];

    const hex2 = [228, 228, 228];
    const off2 = [0, 0, 0];
    const rgb2 = [[hex2[0] - off2[0], hex2[0] + off2[0]], [hex2[1] - off2[1], hex2[1] + off2[1]], [hex2[2] - off2[2], hex2[2] + off2[2]]];

    const hex3 = [200, 72, 72];
    const off3 = [0, 20, 20];
    const rgb3 = [[hex3[0] - off3[0], hex3[0] + off3[0]], [hex3[1] - off3[1], hex3[1] + off3[1]], [hex3[2] - off3[2], hex3[2] + off3[2]]];
    // const rgb1 =[255,0,0];
    // const rgb2 =[0,0,255];
    // const rgb3 =[255,255,255];
    this.initrgb = [rgb1, rgb2, rgb3];
    this.rgb = [];
  }

  randomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min));
  }

  /**
   * Generates a random hex color, if r,g or b is given, the value will be used.
   * @param {int} r Red value.
   * @param {int} g Green value.
   * @param {int} b Blue value.
   * @returns string containing the hex value of the generated color.
   */
  generateRandomColor() {
    // Check for multiple ranges of colors
    if (Array.isArray(this.initrgb) && this.initrgb.length > 0 && Array.isArray(this.initrgb[0]) && this.initrgb[0].length > 0 && Array.isArray(this.initrgb[0][0]) && this.initrgb[0][0].length > 0) {
      this.rgb = [...this.initrgb[this.randomInt(0, this.initrgb.length)]];
    }

    // check for multiple colors
    if (Array.isArray(this.initrgb) && this.initrgb.length > 0 && Array.isArray(this.initrgb[0]) && this.initrgb[0].length === 3) {
      this.rgb = [...this.initrgb[this.randomInt(0, this.initrgb.length)]];
    }

    // Something is not right, default to white bg.
    if (!Array.isArray(this.initrgb) && this.initrgb.length !== 3) return `#ffffff`;

    this.rgb.forEach((v, idx, arr) => {
      v = Number.isInteger(arr[idx]) ? arr[idx] : Array.isArray(arr[idx]) && arr[idx].length == 2 ? this.randomInt(arr[idx][0], arr[idx][1]) : null;
      v = v && v < 0 ? Math.abs(v) : v;
      v = v && v > 255 ? 255 : v;
      v = v || v === 0 ? v : this.randomInt(0, 255);
      arr[idx] = v < 16 ? `0${v.toString(16)}` : v.toString(16);
    });
    let color = `#${this.rgb[0]}${this.rgb[1]}${this.rgb[2]}`;
    return color;
  }

  render() {
    const style = {
      flex: `0 0 ${this.props.width}px`,
      height: `${this.props.height}px`,
      backgroundColor: this.generateRandomColor()
    };
    return React.createElement("div", { style: style });
  }
}

class BgRowComponent extends React.Component {
  constructor(props) {
    super(props);
    this.initialSet = false;
    this.repeats = 0;
    this.state = {
      repeats: 0,
      arr: []
    };
    this.handleResize = this.handleResize.bind(this);
  }

  /**
   * Obtains the estimated required boxes quantity for a single render.
   * @returns Estimated required repeats for a single render of boxes.
   */
  calcRepeats() {
    let width = Math.max(window.innerWidth, window.screen.availWidth);
    let repeats = Math.ceil(width / this.props.width);
    if (this.repeats < repeats || !this.initialSet) {
      this.initialSet = true;
      this.repeats = repeats;
    }
  }

  handleResize(WindowSize, event) {
    const prevRepeats = this.repeats;
    this.calcRepeats();
    if (this.repeats > prevRepeats) {
      let arr = [];
      for (let i = 0; i < this.repeats; i++) arr.push(0);
      this.setState({
        repeats: this.repeats,
        arr: arr
      });
    }
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.addEventListener("resize", null);
  }

  render() {
    const style = {
      display: "flex"
    };
    return React.createElement(
      "div",
      { style: style },
      this.state.arr.map((e, i) => React.createElement(BgBoxComponent, {
        key: i.toString(),
        width: this.props.width,
        height: this.props.height
      }))
    );
  }
}

class BgComponent extends React.Component {
  constructor(props) {
    super(props);

    this.boxWidth = 70;
    this.boxHeight = 70;
    this.repeats = 0;
    this.initialSet = false;

    this.state = {
      repeats: 0,
      arr: []
    };
    this.handleResize = this.handleResize.bind(this);
  }

  handleResize(WindowSize, event) {
    let prevRepeats = this.repeats;
    this.calcRepeats();
    if (this.repeats > prevRepeats) {
      let arr = [];
      for (let i = 0; i < this.repeats; i++) arr.push(0);
      this.setState({
        repeats: this.repeats,
        arr: arr
      });
    }
  }

  /**
   * Obtains the estimated required boxes quantity for a single render.
   * @returns Estimated required repeats for a single render of boxes.
   */
  calcRepeats() {
    let height = Math.max(window.innerHeight, window.screen.availHeight);
    let calcRepeats = Math.ceil(height / this.boxHeight);
    if (this.repeats < calcRepeats || !this.initialSet) {
      this.initialSet = true;
      this.repeats = calcRepeats;
    }
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.addEventListener("resize", null);
  }

  render() {
    return React.createElement(
      "div",
      null,
      this.state.arr.map((e, i) => React.createElement(BgRowComponent, {
        key: i.toString(),
        width: this.boxWidth.toString(),
        height: this.boxHeight.toString()
      }))
    );
  }
}

ReactDOM.render(React.createElement(BgComponent, null), document.getElementById("bg"));
