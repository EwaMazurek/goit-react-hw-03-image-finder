import { Component } from 'react';

class Button extends Component {
  render() {
    return (
      <button className="Button" type="button" onClick={this.props.something}>
        Load moreeee
      </button>
    );
  }
}

export default Button;
