import React, { useState } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import Gallery from './styledComponents/Gallery';

const ImageGallery = ({ images, onImageClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <Gallery className="gallery">
      {images.map((image, index) => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onImageClick={() => {
            setCurrentImageIndex(index);
            onImageClick(image.largeImageURL);
            currentImageIndex();
            // Llamamos a onImageClick para abrir el modal con la imagen correspondiente
          }}
        />
      ))}
    </Gallery>
  );
};

export default ImageGallery;
