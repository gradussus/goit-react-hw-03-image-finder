import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscapeClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscapeClick);
  }

  onEscapeClick = e => {
    if (e.code === 'Escape') {
      this.props.close();
    }
  };
  onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.close();
    }
  };

  render() {
    return (
      <div onClick={this.onBackdropClick}>
        <div>
          <img src={this.props.src} alt="" />
        </div>
      </div>
    );
  }
}
