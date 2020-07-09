import React, { Fragment, useState, useEffect } from 'react'
import Award from './Award'

import awardPics from './awardPics'

const awardPic = (type, i) => {
  const awards = awardPics[type]||[]
  const pic = awards[i % awards.length]
  return `${type}/${pic}`
}

const Awards = ({type="zoo-animals", won}) => {
  const [shown, setShown] = useState(false)

  const awards = awardPics[type]||[]
  const total = awards.length

  won = Math.min(won, awards.length)

  return (
    <Fragment>
      <div className="awards">
        {[...Array(won)].map((e, i) => <Award key={i} name={awardPic(type, i)} hover={true} onClick={() => setShown(i)}/>)}
        {[...Array(total-won)].map((e, i) => <Award key={won+i} i={-1}/>)}
      </div>
      <div className="transparent panel">
        <Award className={`big ${shown === false ? 'hidden' : 'visible'}`} name={awardPic(type, shown)} hideOnClick={true} onHidden={() => setShown(false)}/>
      </div>
    </Fragment>
  )
}

export default Awards
export { awardPic }