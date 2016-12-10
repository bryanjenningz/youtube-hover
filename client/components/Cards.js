import React, {PropTypes} from 'react'
import {latestBlock} from '../utils'

const Card = ({word, translation, removeCard}) =>
  <tr>
    <td>{word}</td>
    <td>{translation}</td>
    <td>
      <button
        className="btn btn-default btn-xs"
        onClick={removeCard}>
        <i className="glyphicon glyphicon-remove" />
      </button>
    </td>
  </tr>

Card.propTypes = {
  word: PropTypes.string.isRequired,
  translation: PropTypes.string.isRequired,
  removeCard: PropTypes.func.isRequired,
}

const Cards = ({cards, japanese, removeCard}) =>
  <div>
    {cards.length > 0 ?
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="text-center">Word</th>
            <th className="text-center">Definition</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card, i) => {
            const {time, wordIndex, translationIndex} = card
            const japaneseBlock = latestBlock(time, japanese, japanese[0])
            const japaneseWord = japaneseBlock.translations[wordIndex].word
            const japaneseTranslation = japaneseBlock.translations[wordIndex].translation[translationIndex]
            return (
              <Card
                key={i}
                word={japaneseWord}
                translation={japaneseTranslation}
                removeCard={() => removeCard(i)} />
            )
          })}
        </tbody>
      </table> :
      <h1
        className="jumbotron"
        style={{background: '#5f9ea0'}}>
        No cards added yet!
      </h1>}
  </div>

Cards.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    time: PropTypes.number.isRequired,
    wordIndex: PropTypes.number.isRequired,
    translationIndex: PropTypes.number.isRequired,
  })).isRequired,
  japanese: PropTypes.arrayOf(PropTypes.shape({
    time: PropTypes.number.isRequired,
    translations: PropTypes.arrayOf(PropTypes.shape({
      word: PropTypes.string.isRequired,
      translation: PropTypes.arrayOf(PropTypes.string),
    })).isRequired,
  })).isRequired,
  removeCard: PropTypes.func.isRequired,
}

export default Cards
