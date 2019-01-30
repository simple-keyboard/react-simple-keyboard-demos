import React, { Component } from "react";
import { render } from "react-dom";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./index.css";

class App extends Component {
  pattern = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

  state = {
    layoutName: "default",
    input: ""
  };

  onChange = input => {
    let inputStatus;

    if (input) {
      inputStatus = input.match(this.pattern) ? "correct" : "incorrect";
    } else {
      inputStatus = "empty";
    }

    this.setState({
      input: input,
      inputStatus: inputStatus
    });
    console.log("Input changed", input);
  };

  onKeyPress = button => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  handleShift = () => {
    let layoutName = this.state.layoutName;

    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default"
    });
  };

  onChangeInput = event => {
    let input = event.target.value;
    let inputStatus;

    if (input) {
      inputStatus = input.match(this.pattern) ? "correct" : "incorrect";
    } else {
      inputStatus = "empty";
    }

    this.setState(
      {
        input: input,
        inputStatus: inputStatus
      },
      () => {
        this.keyboard.setInput(input);
      }
    );
  };

  render() {
    let inputStatus = this.state.inputStatus || "empty";

    return (
      <div>
        <div className={`inputStatus ${inputStatus}`}>
          Input Status: {inputStatus}
        </div>
        <input
          value={this.state.input}
          placeholder={"Type a *local* ip (e.g.: 127.0.0.1)"}
          onChange={e => this.onChangeInput(e)}
        />
        <Keyboard
          ref={r => (this.keyboard = r)}
          layoutName={this.state.layoutName}
          onChange={input => this.onChange(input)}
          onKeyPress={button => this.onKeyPress(button)}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
