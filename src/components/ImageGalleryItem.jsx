import React from 'react';
import ImageGallery from './styledComponents/ItemGallery';

const ImageGalleryItem = ({ image, onImageClick }) => (
  <li className="gallery-item">
    <ImageGallery
      src={image.webformatURL}
      alt=""
      onClick={() => onImageClick(image.largeImageURL)}
    />
  </li>
);

export default ImageGalleryItem;
