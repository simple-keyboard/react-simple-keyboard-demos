import React, { Component } from "react";
import { render } from "react-dom";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./index.css";

class App extends Component {
  state = {
    layoutName: "default",
    input: ""
  };

  onChange = input => {
    this.setState({
      input: input
    });
    console.log("Input changed", input);
  };

  onKeyPress = button => {
    console.log("Button pressed", button);

    /**
     * Shift functionality
     */
    if (button === "{shift}") this.handleShift();

    /**
     * Caps functionality
     */
    if (button === "{lock}") this.handleCaps();
  };

  handleShift = () => {
    let layoutName = this.state.layoutName;

    this.setState({
      layoutName: layoutName === "shift" ? "default" : "shift"
    });
  };

  handleCaps = () => {
    let layoutName = this.state.layoutName;

    this.setState({
      layoutName: layoutName === "caps" ? "default" : "caps"
    });
  };

  onChangeInput = event => {
    let input = event.target.value;
    this.setState(
      {
        input: input
      },
      () => {
        this.keyboard.setInput(input);
      }
    );
  };

  render() {
    return (
      <div>
        <input
          value={this.state.input}
          placeholder={"Press shift or caps to see different layouts"}
          onChange={e => this.onChangeInput(e)}
        />
        <Keyboard
          keyboardRef={r => (this.keyboard = r)}
          layoutName={this.state.layoutName}
          layout={{
            default: [
              "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
              "{tab} q w e r t y u i o p [ ] \\",
              "{lock} a s d f g h j k l ; ' {enter}",
              "{shift} z x c v b n m , . / {shift}",
              ".com @ {space}"
            ],
            shift: [
              "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
              "{tab} Q W E R T Y U I O P { } |",
              '{lock} A S D F G H J K L : " {enter}',
              "{shift} Z X C V B N M < > ? {shift}",
              ".com @ {space}"
            ],
            caps: [
              "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
              "{tab} Q W E R T Y U I O P [ ] \\",
              "{lock} A S D F G H J K L ; ' {enter}",
              "{shift} Z X C V B N M , . / {shift}",
              ".com @ {space}"
            ]
          }}
          onChange={input => this.onChange(input)}
          onKeyPress={button => this.onKeyPress(button)}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
