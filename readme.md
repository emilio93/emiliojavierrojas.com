npm install -g babel-cli
npm install -g babel-preset-react

babel --presets react jsx-hello.js
babel --presets react src --out-dir build
babel --presets react src --watch --out-dir build
babel --watch --presets react .\react-script.jsx --out-file react-script.js
