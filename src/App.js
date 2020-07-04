import React, { useState } from 'react'
import './App.css'
import Confetti from 'react-dom-confetti'
import Award from './Award'

const confettiConfig = {
  angle: 90,
  spread: "90",
  startVelocity: "50",
  elementCount: "75",
  dragFriction: 0.12,
  duration: "5000",
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#cd3e44", "#b7651e", "#c4a71b", "#0f885b", "#0f8187", "#1176b8", "#5161a2", "#e3477c"],
}

const config = {
  min: 0,
  max: 12,
  operators: ['+'], // ['+', '-', '/', '*'] supported
  numToWin: 3,
  onlyPositveAnswers: true,
  colors: ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple', 'pink'], // matches card colors in index.css
}

function App() {
  const {min, max, operators, numToWin, onlyPositveAnswers, colors} = config

  const operatorSymbol = {'*': <span>&times;</span>, '/': <span>&#xF7;</span>, '+':'+', '-':'-'}

  const randomNumber = () => Math.floor(Math.random() * (max-min)) + min
  const randomOperator = () => operators[Math.floor(Math.random() * operators.length)]
  const randomQuestion = () => {
    let x = randomNumber()
    let operator = randomOperator()
    let y = randomNumber()
    if (onlyPositveAnswers && operator == '-' && (y > x)) {[x,y] = [y,x]} // flip
    if (operator == '/') {
      if (x == 0 && y == 0) y = 1
      if (y == 0) {[x,y] = [y,x]} // flip
      [x,y] = [x*y,y] // flip numerator and answer
    }
    return [x,operator,y]
  }
  const randomColor = (color) => {
    console.log('randomColor', color, colors)
    const last = color ? colors.indexOf[color] : 0
    const r = Math.floor(Math.random() * (colors.length-1))
    const next = ((last||0) + r) % colors.length
    const c = colors[next]
    console.log('last', last, 'r', r, 'next', next, 'c', c)
    return c
  }

  const [[x,operator,y], setQuestion] = useState(randomQuestion())
  const f = new Function('x', 'y', `return x ${operator} y;`)
  const correctAnswer = f(x, y)

  const [answer, setAnswer] = useState('')
  const [numCorrect, setNumCorrect] = useState(0)
  const [won, setWon] = useState(0)
  const [showNext, setShowNext] = useState(false)
  const [message, setMessage] = useState('')
  const [color, setColor] = useState(randomColor())

  let maxAnswer = f(max,max)
  if (operator == '-') maxAnswer = f(max,min) * (onlyPositveAnswers ? 1 : -1)
  if (operator == '/') maxAnswer = max
  const maxLength = ('' + maxAnswer).length

  const confirmAnswer = (val) => {
    if (val == correctAnswer) {
      setNumCorrect(numCorrect+1)
      setMessage("Yes, That's Right!")
      if (numCorrect+1 == numToWin) {
        setWon(won + 1)
      }
    } else {
      setNumCorrect(0)
      setMessage(`Nope! It's ${correctAnswer}`)
    }
    setShowNext(true)
  }

  const nextCard = () => {
    setQuestion(randomQuestion())
    setAnswer('')
    setMessage('')
    setShowNext(false)
    setColor(randomColor(color))
    if (numCorrect == numToWin) {
      setNumCorrect(0)
    }
  }

  const onKey = (e) => {
    e = e || window.event
    console.log('onKey', e)
    var key = e.keyCode || e.which

    if (key == 13 && answer.length > 0) {
      if (message.length > 0) nextCard()
      else confirmAnswer(answer)
      return
    }
    if ((key == 8 || key == 46) && answer.length > 0) {
      setAnswer(answer.substr(0,answer.length-1))
      return
    }

    key = String.fromCharCode(key)
    if (!onlyPositveAnswers && (key == '-' || key == '+')) {
      if (answer[0] == '-') setAnswer(answer.substr(1))
      else if (key != '+') setAnswer(key + answer)
      return
    }
    var regex = /[0-9]|\./
    if(regex.test(key) && answer.length < maxLength) {
      setAnswer(answer + key)
      return
    }
  }

  const showGo = !showNext && answer.length > 0 && f(max, max) >= 10
  const messageClass = answer == correctAnswer ? 'correct' : 'incorrect'

  const onClick = () => {
    if (showGo) confirmAnswer(answer)
    if (showNext) nextCard()
  }

  return (
    <div className="App" onKeyDown={e=>onKey(e)} onClick={onClick} tabIndex="0">
      <header className="App-header">
        <div className={`${color} card`}>
          <div className={`message ${messageClass}`}>{message}</div>
          <div className="question">
            <div className="first line"><span className="x">{x}</span></div>
            <div className="second line"><span className="operator">{operatorSymbol[operator]}</span> <span className="y">{y}</span></div>
          </div>
          <div className="answer line">{answer}</div>
          {showGo && <div className="action confirmAnswer">Go!</div>}
          {showNext && <div className="action nextCard">Next Card</div>}
          {!showNext && !showGo && <div className="action none">&nbsp;</div>}
        </div>
        <div className="score">
          <Confetti className="confetti" active={numCorrect == numToWin} config={confettiConfig} />
          {[...Array(numToWin)].map((e, i) => <StarOrDot key={i} i={i} numCorrect={numCorrect}/>)}
        </div>

        <div className="awards">
          {[...Array(won)].map((e, i) => <Award key={i} i={i} isNew={i == won-1}/>)}
        </div>

        <div className="attribution">Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      </header>
    </div>
  )
}

const StarOrDot = ({i,numCorrect}) => {
  if (i < numCorrect) return <span className="star">&#9733;</span>
  return <span className="dot">&middot;</span>
}

export default App
