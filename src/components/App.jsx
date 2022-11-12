import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    query: '',
    queryArr: [],
  };

  onSubmit = name => {
    this.setState({ query: name });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSubmit}></Searchbar>
        <ImageGallery queryArr={this.state.queryArr}></ImageGallery>
      </>
    );
  }
}
