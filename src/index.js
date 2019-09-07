import React, { Component } from "react";
import { render } from "react-dom";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./index.css";

class App extends Component {
  state = {
    layoutName: "default",
    input: "",
    inputPattern: /^\d+$/
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
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();

    // You can notify users when they've pressed the wrong button, if you want.
    // Maybe not with an "alert()", but you get the idea :)
    /*if (
      !button.match(this.state.inputPattern) &&
      !button.includes("{") // Making sure it's not a {function} button
    ) {
      alert("Please only input numbers");
    }*/
  };

  handleShift = () => {
    let layoutName = this.state.layoutName;

    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default"
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
          type={"number"}
          value={this.state.input}
          placeholder={"Only integers will work in this input"}
          onChange={e => this.onChangeInput(e)}
        />
        <Keyboard
          keyboardRef={r => (this.keyboard = r)}
          layoutName={this.state.layoutName}
          onChange={input => this.onChange(input)}
          onKeyPress={button => this.onKeyPress(button)}
          inputPattern={this.state.inputPattern}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
