import React, {Component} from 'react'
import {render} from 'react-dom'
import english from './english'
import japanese from './japanese'
import PopupTranslation from './components/PopupTranslation'
import Cards from './components/Cards'
import {latestBlock, load, save} from './utils'

console.assert(
  english.length > 0 && japanese.length > 0,
  'english and japanese must be non-empty arrays'
)

class App extends Component {
  constructor() {
    super()
    this.state = {
      time: 0,
      english,
      japanese,
      hoverIndex: -1,
      cards: load('cards') || [],
    }

    setInterval(() => {
      if (player && player.getCurrentTime) {
        const currentTime = Number(player.getCurrentTime().toFixed(1))
        this.setState({time: currentTime})
      }
    }, 100)

    this.setHoverIndex = this.setHoverIndex.bind(this)
    this.addCard = this.addCard.bind(this)
    this.removeCard = this.removeCard.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cards.length !== this.state.cards.length) {
      save('cards', this.state.cards)
    }
  }

  setHoverIndex(hoverIndex) {
    this.setState({hoverIndex})
  }

  addCard({time, wordIndex, translationIndex}) {
    console.assert(
      time !== undefined && wordIndex !== undefined && translationIndex !== undefined,
      'time, wordIndex, and translationIndex must be defined'
    )

    this.setState({
      cards: [
        ...this.state.cards,
        {time, wordIndex, translationIndex}
      ]
    })
  }

  removeCard(index) {
    this.setState({
      cards: [
        ...this.state.cards.slice(0, index),
        ...this.state.cards.slice(index + 1)
      ]
    })
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
              <span
                key={wordIndex}
                style={{position: 'relative'}}
                onMouseMove={() => this.setHoverIndex(wordIndex)}>
                <h2
                  style={{display: 'inline'}}
                  className={hovering ? 'hovering' : ''}>
                  {word}
                </h2>
                <PopupTranslation
                  showTranslation={hovering && translation}
                  translation={translation}
                  setHoverIndex={this.setHoverIndex}
                  addCard={(translationIndex) => {
                    this.addCard({time, wordIndex, translationIndex})
                  }} />
              </span>
            )
          })}
        </h4>
        <Cards
          cards={cards}
          english={english}
          japanese={japanese}
          removeCard={this.removeCard.bind(this)} />
      </div>
    )
  }
}

const rootEl = document.querySelector('#root')
render(<App />, rootEl)
