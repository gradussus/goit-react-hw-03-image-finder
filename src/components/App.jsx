import { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { API, searchParams } from './Servises/API';

import css from './App.module.css';

export class App extends Component {
  state = {
    query: '',
    queryArr: [],
    largeImg: '',
    isModalShown: false,
    status: 'idle',
    currentPage: 1,
    totalImage: 0,
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
      this.setState({ status: 'pending' });

      searchParams.set('q', this.state.query);
      searchParams.set('page', this.state.currentPage);

      await API().then(res => {
        if (!res.data.hits.length) {
          this.setState({ status: 'idle' });
          return window.alert(
            'Sorry, there are no images matching your search query. Please try again'
          );
        }
        this.setState(({ queryArr }) => ({
          queryArr: [...queryArr, ...res.data.hits],
          status: 'resolved',
          totalImage: res.data.total,
        }));
      });
    } catch (error) {
      window.alert('Something wrong');
    }
  }

  render() {
    const {onSubmit, onGalleryItemClick, loadMore, toggleModal, state :{queryArr, isModalShown, totalImage, largeImg, status}} = this
    return (
      <section className={css.App}>
        <Searchbar onSubmit={onSubmit} />
        <ImageGallery
          queryArr={queryArr}
          click={onGalleryItemClick}
        />
        {0 < queryArr.length &&
          queryArr.length < totalImage && (
            <Button onClick={loadMore} />
          )}
        {isModalShown && (
          <Modal src={largeImg} close={toggleModal} />
        )}
        {status === 'pending' && <Loader />}
      </section>
    );
  }
}
