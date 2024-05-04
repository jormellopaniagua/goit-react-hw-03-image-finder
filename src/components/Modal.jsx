import React from 'react';
import BasicLightbox from 'basiclightbox';

const Modal = ({ imageUrl, onCloseModal }) => {
  const handleOpenModal = () => {
    const instance = BasicLightbox.create(`
      <div class="modal">
        <img src="${imageUrl}" />
      </div>
    `);
    instance.show();
  };

  return (
    <div className="gallery-item" onClick={handleOpenModal}>
      <img src={imageUrl} alt="" />
    </div>
  );
};

export default Modal;
