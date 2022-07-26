import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3,
      cardImage, cardRare, cardTrunfo, hasTrunfo, isSaveButtonDisabled,
      onInputChange, onSaveButtonClick } = this.props;

    const htmlTrunfo = (
      <label htmlFor="trunfo-input">
        <input
          type="checkbox"
          name="cardTrunfo"
          checked={ cardTrunfo }
          onChange={ onInputChange }
          id="trunfo-input"
          data-testid="trunfo-input"
        />
        Super Trybe Trunfo
      </label>
    );

    return (
      <form action="">
        <div>
          <label htmlFor="name-input">
            Nome
            <input
              name="cardName"
              type="text"
              value={ cardName }
              onChange={ onInputChange }
              id="name-input"
              data-testid="name-input"
              required
            />
          </label>
        </div>

        <div>
          <label htmlFor="description-input">
            Descrição
            <textarea
              name="cardDescription"
              id="description-input"
              value={ cardDescription }
              onChange={ onInputChange }
              data-testid="description-input"
              cols="30"
              rows="10"
              required
            />
          </label>
        </div>

        <div>
          <label htmlFor="attr1-input">
            Atributo 1
            <input
              type="number"
              name="cardAttr1"
              value={ cardAttr1 }
              onChange={ onInputChange }
              id="attr1-input"
              data-testid="attr1-input"
            />
          </label>
        </div>

        <div>
          <label htmlFor="attr2-input">
            Atributo 2
            <input
              type="number"
              name="cardAttr2"
              value={ cardAttr2 }
              onChange={ onInputChange }
              id="attr2-input"
              data-testid="attr2-input"
            />
          </label>
        </div>

        <div>
          <label htmlFor="attr3-input">
            Atributo 3
            <input
              type="number"
              name="cardAttr3"
              value={ cardAttr3 }
              onChange={ onInputChange }
              id="attr3-input"
              data-testid="attr3-input"
            />
          </label>
        </div>

        <div>
          <label htmlFor="imagem-input">
            Imagem
            <input
              type="text"
              name="cardImage"
              value={ cardImage }
              onChange={ onInputChange }
              id="imagem-input"
              data-testid="image-input"
              required
            />
          </label>
        </div>

        <div>
          <label htmlFor="rare-input">
            Raridade
            <select
              name="cardRare"
              value={ cardRare }
              onChange={ onInputChange }
              id="rare-input"
              data-testid="rare-input"
              required
            >
              <option label="normal" value="normal">normal</option>
              <option label="raro" value="raro">raro</option>
              <option label="muito raro" value="muito raro">muito raro</option>
            </select>
          </label>
        </div>

        <div>
          {
            hasTrunfo ? <p>Você já tem um Super Trunfo em seu baralho</p> : htmlTrunfo
          }
        </div>

        <div>
          <button
            type="button"
            disabled={ isSaveButtonDisabled }
            onClick={ onSaveButtonClick }
            data-testid="save-button"
          >
            Salvar
          </button>
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
