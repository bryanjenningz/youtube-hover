import React from 'react'
import {Link} from 'react-router'

const Intro = () =>
  <div className="text-center">
    <h1>How to learn using YouTube Hover</h1>
    <div>
      <div>
        <h2>Watch Japanese YouTube videos</h2>
        <p>Watch the video and click on any Japanese words you do not know.</p>
      </div>
      <div>
        <h2>Learn words</h2>
        <p>Get quizzed on the words you do not know until you understand all of them.</p>
      </div>
      <div>
        <h2>Rewatch</h2>
        <p>Watch the video again after learning the words to improve your listening comprehension.</p>
      </div>
    </div>
    <Link to="/second">
      <button className="btn btn-primary btn-lg">Start</button>
    </Link>
  </div>

export default Intro
