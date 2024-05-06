import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import Page from './styledComponents/page';

const API_KEY = '43149026-ef77b7f6113923fd46a63d2ce';
export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    query: '',
    page: 1,
    showModal: false, // Estado para controlar si el modal está abierto o cerrado
    selectedImage: null, // URL de la imagen seleccionada para mostrar en el modal
  };

  componentDidMount() {
    // Este método se llama automáticamente después de que el componente haya sido renderizado en el DOM
    // Aquí podrías realizar operaciones de inicialización, como cargar datos iniciales
  }

  componentDidUpdate(prevProps, prevState) {
    // Este método se llama automáticamente después de que el componente se actualiza en el DOM
    // Aquí podrías realizar operaciones basadas en los cambios en las props o el estado
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages(); // Llama a la función para cargar imágenes si la consulta o la página cambian
    }
  }

  componentWillUnmount() {
    // Este método se llama automáticamente justo antes de que el componente sea eliminado del DOM
    // Aquí podrías limpiar cualquier suscripción o temporizador creado en componentDidMount o componentDidUpdate
  }

  fetchImages = async () => {
    // Función para cargar imágenes desde la API de Pixabay
    const { query, page } = this.state;
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&page=${page}&image_type=photo&per_page=12`;

    this.setState({ isLoading: true }); // Establece isLoading en true para mostrar el indicador de carga

    try {
      const response = await axios.get(url);
      const newImages = response.data.hits;

      this.setState(prevState => ({
        images: [...prevState.images, ...newImages], // Agrega las nuevas imágenes a las imágenes existentes
        isLoading: false, // Establece isLoading en false cuando las imágenes se han cargado correctamente
      }));
    } catch (error) {
      this.setState({ error: error.message, isLoading: false }); // Maneja errores de carga de imágenes
    }
  };

  handleSubmit = query => {
    // Función para manejar el envío del formulario de búsqueda
    this.setState({ query, images: [], page: 1 }); // Reinicia el estado de las imágenes y la página al realizar una nueva búsqueda
  };

  handleLoadMore = () => {
    // Función para manejar el botón "Cargar más"
    this.setState(prevState => ({ page: prevState.page + 1 })); // Incrementa el número de página para cargar más imágenes
  };

  handleImageClick = imageUrl => {
    // Función para manejar el clic en una imagen de la galería
    this.setState({
      selectedImage: imageUrl, // Establece la URL de la imagen seleccionada para mostrar en el modal
      showModal: true, // Abre el modal
    });
  };

  handleCloseModal = () => {
    // Función para manejar el cierre del modal
    this.setState({ showModal: false, selectedImage: null }); // Cierra el modal y restablece la URL de la imagen seleccionada
  };

  handlePreviousImageClick = () => {
    // Función para manejar el clic en el botón "anterior" del modal
    const { images, selectedImage } = this.state;
    const currentIndex = images.findIndex(
      img => img.largeImageURL === selectedImage
    );
    const previousIndex = (currentIndex - 1 + images.length) % images.length; // Calcula el índice de la imagen anterior en el array de imágenes
    const previousImage = images[previousIndex].largeImageURL; // Obtiene la URL de la imagen anterior
    this.setState({ selectedImage: previousImage }); // Muestra la imagen anterior en el modal
  };

  handleNextImageClick = () => {
    // Función para manejar el clic en el botón "siguiente" del modal
    const { images, selectedImage } = this.state;
    const currentIndex = images.findIndex(
      img => img.largeImageURL === selectedImage
    );
    const nextIndex = (currentIndex + 1) % images.length; // Calcula el índice de la siguiente imagen en el array de imágenes
    const nextImage = images[nextIndex].largeImageURL; // Obtiene la URL de la siguiente imagen
    this.setState({ selectedImage: nextImage }); // Muestra la siguiente imagen en el modal
  };

  render() {
    // Función para renderizar el componente en el DOM
    const { images, isLoading, error, showModal, selectedImage } = this.state; // Obtiene el estado actual del componente

    return (
      <Page className="App">
        <Searchbar onSubmit={this.handleSubmit} />{' '}
        {/* Componente de barra de búsqueda */}
        {error && <p>Error: {error}</p>}{' '}
        {/* Muestra un mensaje de error si ocurrió un error */}
        <ImageGallery
          images={images}
          onImageClick={this.handleImageClick}
        />{' '}
        {/* Componente de galería de imágenes */}
        {isLoading && <Loader />}{' '}
        {/* Muestra un indicador de carga si se están cargando imágenes */}
        {images.length > 0 &&
          !isLoading && ( // Muestra el botón "Cargar más" si hay imágenes y no se están cargando más
            <Button onClick={this.handleLoadMore} />
          )}
        {showModal && ( // Muestra el modal si showModal es true
          <Modal
            imageUrl={selectedImage} // URL de la imagen a mostrar en el modal
            onCloseModal={this.handleCloseModal} // Función para cerrar el modal
            onPreviousImageClick={this.handlePreviousImageClick} // Función para mostrar la imagen anterior en el modal
            onNextImageClick={this.handleNextImageClick} // Función para mostrar la siguiente imagen en el modal
          />
        )}
      </Page>
    );
  }
}
