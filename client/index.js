import React, {Component} from 'react'
import {render} from 'react-dom'
import english from './english'
import japanese from './japanese'

console.assert(english.length > 0 && japanese.length > 0)

const latestBlock = (time, timeBlocks, defaultValue) =>
  timeBlocks.filter(block => block.time <= time).reverse()[0] || defaultValue

const Card = ({card, english, japanese}) => {
  const {time, wordIndex, translationIndex} = card
  const japaneseBlock = latestBlock(time, japanese, japanese[0])
  const japaneseText = japaneseBlock.translations.map(entry => entry.word).join('')
  const japaneseWord = japaneseBlock.translations[wordIndex].word
  const japaneseTranslation = japaneseBlock.translations[wordIndex].translation[translationIndex]
  const englishText = latestBlock(time, english, english[0]).text
  return (
    <div>
      <div>{time}, {wordIndex}, {translationIndex}</div>
      <div>{englishText}</div>
      <div>{japaneseText}</div>
      <div>{japaneseWord}</div>
      <div>{japaneseTranslation}</div>
    </div>
  )
}

class App extends Component {
  constructor() {
    super()
    this.state = {time: 0, english, japanese, hoverIndex: -1, cards: []}
    setInterval(() => {
      if (typeof player.getCurrentTime === 'function') {
        const currentTime = Number(player.getCurrentTime().toFixed(1))
        this.setState({time: currentTime})
      }
    }, 100)
  }

  render() {
    const {time, english, japanese, hoverIndex, cards} = this.state
    const englishBlock = latestBlock(time, english, english[0])
    const japaneseBlock = latestBlock(time, japanese, japanese[0])

    const englishText = englishBlock.text
    const japaneseTranslations = japaneseBlock.translations
    return (
      <div className="text-center">
        <h4>
          {cards.map((card, i) => <Card key={i} card={card} english={english} japanese={japanese} />)}
        </h4>
        <h4>{englishText}</h4>
        <h4>
          {japaneseTranslations.map(({word, translation}, wordIndex) => {
            const hovering = hoverIndex === wordIndex
            return (
              <span key={wordIndex}
                style={{background: hovering ? 'cyan' : 'none', position: 'relative'}}
                onMouseMove={() => this.setState({hoverIndex: wordIndex})}>
                {word}
                {hovering && translation ?
                  <span style={{position: 'absolute', top: 20, left: -180, background: 'cyan', width: 400, padding: 10}}>
                    {translation.slice(0, 5).map((translationEntry, translationIndex) =>
                      <div key={translationIndex}>
                        <button
                          className="btn btn-default btn-xs"
                          onClick={() => this.setState({cards: [...cards, {time, wordIndex, translationIndex}]})}>
                          +
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
      </div>
    )
  }
}

const rootEl = document.querySelector('#root')
render(<App />, rootEl)
