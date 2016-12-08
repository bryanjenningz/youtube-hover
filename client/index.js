import React, {Component} from 'react'
import {render} from 'react-dom'
import english from './english'
import japanese from './japanese'

console.assert(english.length > 0 && japanese.length > 0)

const load = (name) => {
  try {
    return JSON.parse(localStorage.getItem(name))
  } catch (err) {
    console.error('Failed to load from localStorage')
  }
}

const save = (name, value) => {
  try {
    localStorage.setItem(name, JSON.stringify(value))
  } catch (err) {
    // Ignore write errors
  }
}

const latestBlock = (time, timeBlocks, defaultValue) =>
  timeBlocks.filter(block => block.time <= time).reverse()[0] || defaultValue

const Cards = ({cards, english, japanese, removeCard}) =>
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
          {cards.map((card, i) => <Card key={i} card={card} english={english} japanese={japanese} removeCard={() => removeCard(i)} />)}
        </tbody>
      </table> :
      <h1 className="jumbotron" style={{background: '#5f9ea0'}}>No cards added yet!</h1>}
  </div>

const Card = ({card, english, japanese, removeCard}) => {
  const {time, wordIndex, translationIndex} = card
  const japaneseBlock = latestBlock(time, japanese, japanese[0])
  const japaneseText = japaneseBlock.translations.map(entry => entry.word).join('')
  const japaneseWord = japaneseBlock.translations[wordIndex].word
  const japaneseTranslation = japaneseBlock.translations[wordIndex].translation[translationIndex]
  const englishText = latestBlock(time, english, english[0]).text
  return (
    <tr>
      <td>{japaneseWord}</td>
      <td>{japaneseTranslation}</td>
      <td><button
        className="btn btn-default btn-xs"
        onClick={removeCard}>
        <i className="glyphicon glyphicon-remove" />
      </button></td>
    </tr>
  )
}

class App extends Component {
  constructor() {
    super()
    this.state = {time: 0, english, japanese, hoverIndex: -1, cards: load('cards') || []}
    setInterval(() => {
      if (typeof player.getCurrentTime === 'function') {
        const currentTime = Number(player.getCurrentTime().toFixed(1))
        this.setState({time: currentTime})
      }
    }, 100)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cards.length !== this.state.cards.length) {
      save('cards', this.state.cards)
    }
  }

  removeCard(i) {
    this.setState({cards: [...this.state.cards.slice(0, i), ...this.state.cards.slice(i + 1)]})
  }

  render() {
    const {time, english, japanese, hoverIndex, cards} = this.state
    const englishBlock = latestBlock(time, english, english[0])
    const japaneseBlock = latestBlock(time, japanese, japanese[0])

    const englishText = englishBlock.text
    const japaneseTranslations = japaneseBlock.translations
    return (
      <div className="text-center">
        <h4>{englishText}</h4>
        <h4>
          {japaneseTranslations.map(({word, translation}, wordIndex) => {
            const hovering = hoverIndex === wordIndex
            return (
              <span key={wordIndex}
                style={{position: 'relative'}}
                onMouseMove={() => this.setState({hoverIndex: wordIndex})}>
                <h2 style={{display: 'inline'}} className={hovering ? 'hovering' : ''}>{word}</h2>
                {hovering && translation ?
                  <span style={{position: 'absolute', top: 20, left: -180, width: 400, padding: 10}} className="hovering">
                    <div className="pull-right">
                      <button
                        className="btn btn-default btn-xs"
                        onClick={() => this.setState({hoverIndex: -1})}>
                        <i className="glyphicon glyphicon-remove" />
                      </button>
                    </div>
                    {translation.slice(0, 5).map((translationEntry, translationIndex) =>
                      <div key={translationIndex}>
                        <button
                          className="btn btn-default btn-xs"
                          onClick={() => this.setState({cards: [...cards, {time, wordIndex, translationIndex}]})}>
                          <i className="glyphicon glyphicon-plus" />
                        </button>
                        {translationEntry}
                      </div>
                    )}
                  </span> :
                  null}
              </span>
            )
          })}
        </h4>
        <Cards cards={cards} english={english} japanese={japanese} removeCard={this.removeCard.bind(this)} />
      </div>
    )
  }
}

const rootEl = document.querySelector('#root')
render(<App />, rootEl)
