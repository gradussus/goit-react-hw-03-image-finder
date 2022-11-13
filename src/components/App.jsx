import { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';

import css from './App.module.css';

import axios from 'axios';

const searchParams = new URLSearchParams({
  key: '30176034-3a939666b78dd32120afd5b2c',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
});

export class App extends Component {
  state = {
    query: '',
    queryArr: [],
    largeImg: '',
    isModalShown: false,
    reqStatus: 'idle',
    currentPage: 1,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.currentPage !== this.state.currentPage
    ) {
      return this.requestFunc();
    }
  }

  onSubmit = name => {
    this.setState({
      query: name,
      currentPage: 1,
      largeImg: '',
      queryArr: [],
    });
  };

  toggleModal = () => {
    this.setState(({ isModalShown }) => ({ isModalShown: !isModalShown }));
  };

  onGalleryItemClick = src => {
    this.toggleModal();
    this.setState({ largeImg: src });
  };

  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  async requestFunc() {
    try {
      this.setState({ reqStatus: 'pending' });

      searchParams.set('q', this.state.query);
      searchParams.set('page', this.state.currentPage);
      await axios.get(`https://pixabay.com/api/?${searchParams}`).then(res => {
        if (!res.data.hits.length) {
          this.setState({ status: 'idle' });
          return window.alert(
            'Sorry, there are no images matching your search query. Please try again'
          );
        }
        this.setState(({ queryArr }) => ({
          queryArr: [...queryArr, ...res.data.hits],
          reqStatus: 'resolved',
          totalImg: res.data.total,
        }));
      });
    } catch (error) {
      console.log('Error');
    }
  }

  render() {
    return (
      <section className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery
          queryArr={this.state.queryArr}
          click={this.onGalleryItemClick}
        />
        <Button onClick={this.loadMore} />
        {this.state.isModalShown && (
          <Modal src={this.state.largeImg} close={this.toggleModal} />
        )}
      </section>
    );
  }
}
