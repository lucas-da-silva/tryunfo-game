import React from 'react';
import './App.css';
import Form from './components/Form';
import Card from './components/Card';
import GetCards from './components/GetCards';
import NameFilter from './components/NameFilter';
import RareFilter from './components/RareFilter';
import TrunfoFilter from './components/TrunfoFilter';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardImage: '',
    cardAttr1: '',
    cardAttr2: '',
    cardAttr3: '',
    remainingPoints: 210,
    cardRare: 'normal',
    cardTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    cards: [],
    nameFilter: '',
    rareFilter: 'todas',
    trunfoFilter: false,
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, () => {
      this.validationButtonSubmit();
      this.remainingPoints();
    });
  }

  validationButtonSubmit = () => {
    const { cardName, cardDescription, cardImage, cardAttr1, cardAttr2,
      cardAttr3 } = this.state;
    let buttonIsDisabled = true;
    const cardLimit = 91;
    const totalLimit = 211;

    const sum = parseFloat(cardAttr1)
    + parseFloat(cardAttr2) + parseFloat(cardAttr3) < totalLimit;
    const min = cardName.length && cardDescription.length && cardImage.length;
    const max = cardAttr1 < cardLimit && cardAttr2 < cardLimit && cardAttr3 < cardLimit;
    const negative = cardAttr1 >= 0 && cardAttr2 >= 0 && cardAttr3 >= 0;

    if (sum && min && max && negative) {
      buttonIsDisabled = false;
    }

    this.setState({ isSaveButtonDisabled: buttonIsDisabled });
  }

  remainingPoints = () => {
    const { cardAttr1, cardAttr2, cardAttr3 } = this.state;
    const limitPoints = 210;
    let sum = 0;
    if (cardAttr1) {
      sum += parseFloat(cardAttr1);
    }
    if (cardAttr2) {
      sum += parseFloat(cardAttr2);
    }
    if (cardAttr3) {
      sum += parseFloat(cardAttr3);
    }

    this.setState({ remainingPoints: limitPoints - sum });
  }

  onSaveButtonClick = () => {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3,
      cardImage, cardRare, cardTrunfo, hasTrunfo } = this.state;
    const existTrunfo = cardTrunfo === true;
    const card = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
    };

    this.setState((previState) => ({
      cards: [...previState.cards, card],
      cardName: '',
      cardDescription: '',
      cardImage: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: existTrunfo,
      isSaveButtonDisabled: true,
    }));
  }

  removeCard = ({ target }) => {
    const superTrunfo = target.parentElement.childNodes[1].innerText === 'Trunfo';
    if (superTrunfo) {
      this.setState({ hasTrunfo: false });
    }
    target.parentElement.parentElement.remove();
  }

  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3, remainingPoints,
      cardImage, cardRare, cardTrunfo, hasTrunfo, isSaveButtonDisabled,
      cards, nameFilter, rareFilter, trunfoFilter } = this.state;

    return (
      <main className="main">
        <h1>Tryunfo</h1>
        <div className="create-card">
          <Form
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            remainingPoints={ remainingPoints }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
            hasTrunfo={ hasTrunfo }
            isSaveButtonDisabled={ isSaveButtonDisabled }
            onInputChange={ this.onInputChange }
            onSaveButtonClick={ this.onSaveButtonClick }
          />

          <div className="pre-visu">
            <h2>Pré-visualização</h2>
            <Card
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardImage={ cardImage }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
            />
          </div>
        </div>

        <div className="cards-container">
          <h2>Todas as cartas</h2>
          <div className="filter-cards">
            <div className="filters">
              <h4>Filtros de busca</h4>
              <NameFilter
                onInputChange={ this.onInputChange }
                nameFilter={ nameFilter }
                trunfoFilter={ trunfoFilter }
              />
              <RareFilter
                onInputChange={ this.onInputChange }
                rareFilter={ rareFilter }
                trunfoFilter={ trunfoFilter }
              />
              <TrunfoFilter
                trunfoFilter={ trunfoFilter }
                onInputChange={ this.onInputChange }
              />
            </div>
            <div className="cards">
              { cards.length > 0 && <GetCards
                cards={ cards }
                nameFilter={ nameFilter }
                removeCard={ this.removeCard }
                rareFilter={ rareFilter }
                trunfoFilter={ trunfoFilter }
              />}
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
