import React, { useState, useEffect } from 'react'
import './App.css'
import Confetti from 'react-dom-confetti'
import Awards, { awardPic } from './Awards'
import Award from './Award'
import Drawer from './Drawer'
import NumPad from './NumPad'

const confettiConfig = {
  angle: "90",
  spread: "270",
  startVelocity: "40",
  elementCount: "100",
  dragFriction: 0.12,
  duration: 3000,
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
      x = x*y // flip numerator and answer
    }
    return [x,operator,y]
  }
  const randomColor = (color) => {
    console.log('randomColor', color, colors)
    const last = color ? colors.indexOf[color] : 0
    const r = Math.floor(Math.random() * (colors.length-1))
    const next = ((last||0) + 1 + r) % colors.length
    const c = colors[next]
    console.log('last', last, 'r', r, 'next', next, 'c', c)
    return c
  }

  const [[x,operator,y], setQuestion] = useState(randomQuestion())
  // eslint-disable-next-line no-new-func
  const f = new Function('x', 'y', `return x ${operator} y;`)
  const correctAnswer = f(x, y)

  const [answer, setAnswer] = useState('')
  const [numCorrect, setNumCorrect] = useState(0)
  const [won, setWon] = useState(0)
  const [showAward, setShowAward] = useState(false)
  const [hideAward, setHideAward] = useState(false)
  const [showNext, setShowNext] = useState(false)
  const [showNumPad, setShowNumPad] = useState(false)
  const [numPadEver, setNumPadEver] = useState(false)
  const [message, setMessage] = useState('')
  const [color, setColor] = useState(randomColor())
  const [awardType, setAwardType] = useState('zoo-animals')

  useEffect(() => {
    if (showNumPad) setNumPadEver(true)
  }, [showNumPad])

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
        setShowAward(true)
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
    if (numPadEver) setShowNumPad(true)
    if (numCorrect == numToWin) {
      setNumCorrect(0)
    }
  }

  const onKey = (e) => {
    e = e || window.event
    var keyCode = e.keyCode || e.which

    if (keyCode == 13 && answer.length > 0) {
      if (showAward && message.length > 0) {
        console.log('hide 1')
        setHideAward(true)
      }
      else if (message.length > 0) nextCard()
      else {
        confirmAnswer(answer)
        if (!showNumPad && numPadEver) setNumPadEver(false)
        setShowNumPad(false)
      }
      return
    }
    if ((keyCode == 8 || keyCode == 46) && answer.length > 0) {
      setAnswer(answer.substr(0,answer.length-1))
      return
    }

    keyCode = String.fromCharCode(keyCode)
    if (!onlyPositveAnswers && (keyCode == '-' || keyCode == '+')) {
      if (answer[0] == '-') setAnswer(answer.substr(1))
      else if (keyCode != '+') setAnswer(keyCode + answer)
      return
    }
    var regex = /[0-9]|\./
    if(regex.test(keyCode) && answer.length < maxLength) {
      setAnswer(answer + keyCode)
      return
    }
  }

  const showGo = !showNext && answer.length > 0 && f(max, max) >= 10
  const correct = showNext ? answer == correctAnswer ? 'correct' : 'incorrect' : ''
  const tiny = showNumPad ? 'tiny' : null
  const shown = showNumPad ? 'shown' : null

  const onClick = () => {
    console.log('click root')
    if (showNext) {
      console.log('hide 2')
      setHideAward(true)
      nextCard()
    }
    else if (numPadEver) setShowNumPad(!showNumPad)
    else if (showGo) confirmAnswer(answer)
    else setShowNumPad(!showNumPad)
  }

  return (
    <div className="App" onKeyDown={e=>onKey(e)} tabIndex="0">

      <div className="transparent panel">
        <NumPad className={`${shown}`} onKey={onKey}/>
      </div>
      <div className="transparent panel">
        <div className={`${color} card ${tiny} ${correct}`} onClick={onClick}>
          <div className={`message`}>{message}</div>
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
          {[...Array(numToWin)].map((e, i) => <StarOrDot key={i} i={i} numCorrect={numCorrect}/>)}
        </div>
        <div className="attribution">Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      </div>

      <div className={`transparent panel`}>
        <div>
          &nbsp;
          <Confetti className="confetti" active={numCorrect == numToWin} config={confettiConfig} />
        </div>
      </div>
      <div className={`transparent panel`}>
        <Award className={`big toDrawer ${showAward ? 'visible' : 'hidden'}`} name={awardPic(awardType, won-1)} hideAward={hideAward} hideOnClick={true} onHidden={() => {
          console.log('hide 3')
          setHideAward(false); setShowAward(false)}}/>
      </div>

      <div className={`transparent panel`}>
        <Drawer><Awards type={awardType} won={won}/></Drawer>
      </div>

    </div>
  )
}

const StarOrDot = ({i,numCorrect}) => {
  if (i < numCorrect) return <span className="star">&#9733;</span>
  return <span className="dot">&middot;</span>
}

export default App
