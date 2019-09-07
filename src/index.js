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
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  handleShift = () => {
    let layoutName = this.state.layoutName;

    this.setState({
      layoutName: layoutName === "shift" ? "default" : "shift"
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
    let sharedProps = {
      layoutName: this.state.layoutName,
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button),

      // This syncs the input of all keyboards
      syncInstanceInputs: true
    };

    return (
      <div>
        <input
          value={this.state.input}
          placeholder={"Tap on the virtual keyboard to start"}
          onChange={e => this.onChangeInput(e)}
        />

        <div className={"container"}>
          <h3>Keyboard 1</h3>
          <Keyboard keyboardRef={r => (this.keyboard = r)} {...sharedProps} />

          <h3>Keyboard 2</h3>
          <Keyboard {...sharedProps} baseClass={"keyboard2"} />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
