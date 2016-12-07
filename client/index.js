import React, {Component} from 'react'
import {render} from 'react-dom'
import english from './english'
import japanese from './japanese'

console.assert(english.length > 0 && japanese.length > 0)

class App extends Component {
  render() {
    return (
      <div>
        <Transcript />
      </div>
    )
  }
}

const latestBlock = (time, timeBlocks, defaultValue) =>
  timeBlocks.filter(block => block.time <= time).reverse()[0] || defaultValue

class Transcript extends Component {
  constructor() {
    super()
    this.state = {time: 0, english, japanese, hoverIndex: -1}
    setInterval(() => {
      if (typeof player.getCurrentTime === 'function') {
        const currentTime = Number(player.getCurrentTime().toFixed(1))
        this.setState({time: currentTime})
      }
    }, 100)
  }

  render() {
    const {time, english, japanese, hoverIndex} = this.state
    const englishBlock = latestBlock(time, english, english[0])
    const japaneseBlock = latestBlock(time, japanese, japanese[0])

    const englishText = englishBlock.text
    const japaneseTranslations = japaneseBlock.translations
    return (
      <div>
        <h4>{englishText}</h4>
        <h4>
          {japaneseTranslations.map(({word, translation}, i) => {
            const hovering = hoverIndex === i
            return (
              <span key={i}
                style={{background: hovering ? 'cyan' : 'none', position: 'relative'}}
                onMouseMove={() => this.setState({hoverIndex: i})}>
                {word}
                {hovering && translation ?
                  <span style={{position: 'absolute', top: 20, left: 0, background: 'cyan', width: 400, padding: 10}}>
                    {translation.map((t, i) => <div key={i}>{t}</div>)}
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
