import { Component } from 'react';

class ImageGalleryItem extends Component {
  render() {
    return (
      <>
        {this.props.fetchedData.map(item => (
          <li key={item.id} className="ImageGalleryItem">
            <img
              className="ImageGalleryItem-image"
              src={item.webformatURL}
              alt="some nice pic"
            />
          </li>
        ))}
      </>
    );
  }
}
export default ImageGalleryItem;