import styled from 'styled-components';
const ModalStyle = styled.div`
  position: fixed;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(128, 128, 128, 0.382);
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  .container-modal {
    display: flex;
    flex-direction: row;
  }
  .nave {
    max-height: fit-content;
    background-color: transparent;
    border-style: none;
  }
  .cont-button {
    display: grid;
    justify-items: end;
    padding: 10px;
  }
  .cerrar {
    display: grid;
    background-color: rgb(224, 112, 142);
    border-radius: 25%;
  }
`;
export default ModalStyle;
