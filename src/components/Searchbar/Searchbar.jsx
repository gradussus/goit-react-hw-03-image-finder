import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleChangeQuery = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchQuery.trim().length === 0) {
      return;
    }

    this.props.onSubmit(this.state.searchQuery);

    this.setState({ searchQuery: '' });
    e.target.reset();
  };

  render() {
    return (
      <header class="searchbar">
        <form class="form" onSubmit={this.handleSubmit}>
          <button type="submit" class="button">
            <span class="button-label">Search</span>
          </button>

          <input
            class="input"
            onChange={this.handleChangeQuery}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
