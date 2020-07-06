import React, { Fragment, useState, useEffect } from 'react'
import Award from './Award'

const awards = [
'001-ufo.svg',
'002-spaceship.svg',
'003-radar.svg',
'004-ufo.svg',
'005-alien.svg',
'006-ufo.svg',
'007-alien.svg',
'008-ufo.svg',
'009-spaceship.svg',
'010-alien.svg',
'011-spaceship.svg',
'012-alien.svg',
'013-alien.svg',
'014-ufo.svg',
'015-wormhole.svg',
'016-spaceship.svg',
'018-scan.svg',
'017-alien.svg',
'019-spaceship.svg',
'020-ufo.svg',
'021-alien.svg',
'022-alien.svg',
'023-ufo.svg',
'024-top secret.svg',
'025-blaster.svg',
'026-spaceship.svg',
'027-alien.svg',
'028-alien.svg',
'029-abduction.svg',
'030-spaceship.svg',
]

const award = (i) => awards[i % awards.length]

const Awards = ({won}) => {
  const [shown, setShown] = useState(false)

  const total = awards.length;

  won = Math.min(won, awards.length)

  return (
    <Fragment>
      <div className="awards">
        {[...Array(won)].map((e, i) => <Award key={i} name={award(i)} hover={true} onClick={() => setShown(i)}/>)}
        {[...Array(total-won)].map((e, i) => <Award key={won+i} i={-1}/>)}
      </div>
      {shown !== false &&
        <div className="transparent panel">
          <Award className="big" name={award(shown)} hideOnClick={true} onHidden={() => setShown(false)}/>
        </div>
      }
    </Fragment>
  )
}

export default Awards
export { award }