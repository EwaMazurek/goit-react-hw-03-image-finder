import { Component } from 'react';
import Searchbar from './Searchbar.jsx';
import axios from 'axios';
import { ImageGallery } from './ImageGallery.jsx';
import ImageGalleryItem from './ImageGalleryItem.jsx';
import Button from './Button.jsx';
import { Loader } from './Loader.jsx';
axios.defaults.baseURL = 'https://pixabay.com/api';
export class App extends Component {
  API_KEY = '33287723-ac3e9d0bf292ee3d9e11c0a66';

  state = {
    query: '',
    responses: [],
    isLoading: false,
    showModal: false,
    page: 1,
  };

  incPage = () => {
    this.handleSearch(this.state.query);
  };

  handleSearch = async query => {
    this.setState({ isLoading: true });
    const response = await axios.get(
      `/?q=${query}&page=${this.state.page}&key=${this.API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    this.setState(prevState => ({ page: prevState.page + 1 }));
    const data = response.data.hits;
    this.setState(prevState => ({
      responses: [...prevState.responses, ...data],
      isLoading: false,
    }));
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.query !== this.state.query)
      this.handleSearch(this.state.query);
  };

  handleQuery = event => {
    event.preventDefault();
    this.setState({ responses: [], page: 1 });

    const inputValue = event.target.elements.searchInput.value;
    this.setState({ query: inputValue });
  };
  render() {
    return (
      <div className="App">
        <Searchbar handleSubmit={this.handleQuery}></Searchbar>
        {this.state.isLoading === true && <Loader />}
        <ImageGallery>
          <ImageGalleryItem fetchedData={this.state.responses} />
        </ImageGallery>
        {this.state.responses.length > 0 && (
          <Button something={this.incPage}></Button>
        )}
      </div>
    );
  }
}
