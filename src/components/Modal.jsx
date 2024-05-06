import React from 'react';
import ModalStyle from './styledComponents/ModalStyle';

const Modal = ({
  imageUrl,
  onCloseModal,
  onPreviousImageClick,
  onNextImageClick,
}) => {
  const handleOutsideClick = event => {
    // Si el clic ocurre fuera del contenido del modal, cerramos el modal
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };
  return (
    <ModalStyle className="gallery-item" onClick={handleOutsideClick}>
      <div className="cont-button">
        <button className="cerrar" onClick={onCloseModal}>
          X
        </button>
      </div>
      <div className="container-modal">
        <button className="nave" onClick={onPreviousImageClick}>
          anterior
        </button>{' '}
        {/* Botón para mostrar la imagen anterior */}
        <img src={imageUrl} alt="" width="800" height="600" />
        <button className="nave" onClick={onNextImageClick}>
          siguiente
        </button>{' '}
        {/* Botón para mostrar la siguiente imagen */}
      </div>
    </ModalStyle>
  );
};

export default Modal;
