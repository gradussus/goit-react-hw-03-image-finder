import { Component } from 'react';
import css from './Modal.module.css'

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
      <div className={css.Overlay} onClick={this.onBackdropClick}>
        <div>
          <img className={css.Modal} src={this.props.src} alt="" />
        </div>
      </div>
    );
  }
}
