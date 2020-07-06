import React from 'react'

const zero = 48
const backspace = 8
const enter = 13
const keyNames = {8: 'Backspace', 13: 'Enter', 46: 'Delete'}

const NumPad = ({className, onKey}) => {

  const keyPress = (e, keyCode) => {
    console.log('click key')
    let event = {
      keyCode,
      which: keyCode,
      key: keyNames[keyCode] || String.fromCharCode(keyCode)
    }
    console.log(event)
    onKey(event)
  }

  return (
    <div className={`numpad ${className}`}>
      <div className="row">
        {[7,8,9].map((n,i) => <div className="key" key={i} onClick={(e)=>keyPress(n, zero+n)}><span>{n}</span></div>)}
      </div>
      <div className="row">
        {[4,5,6].map((n,i) => <div className="key" key={i} onClick={(e)=>keyPress(n, zero+n)}><span>{n}</span></div>)}
      </div>
      <div className="row">
        {[1,2,3].map((n,i) => <div className="key" key={i} onClick={(e)=>keyPress(n, zero+n)}><span>{n}</span></div>)}
      </div>
      <div className="row">
        <div className="key" onClick={(e)=>keyPress(e, zero)}><span>0</span></div>
        <div className="key backspace" onClick={(e)=>keyPress(e, backspace)}><span>&larr;</span></div>
        <div className="key enter" onClick={(e)=>keyPress(e, enter)}><span>Go!</span></div>
      </div>
    </div>
  )
}

export default NumPad