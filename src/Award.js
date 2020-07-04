import React, { useRef, useEffect } from 'react'

const awards = [
  '001-ufo.svg',
  '004-ufo.svg',
  '007-alien.svg',
  '010-alien.svg',
  '013-alien.svg',
  '016-spaceship.svg',
  '019-spaceship.svg',
  '022-alien.svg',
  '025-blaster.svg',
  '028-alien.svg',
  '002-spaceship.svg',
  '005-alien.svg',
  '008-ufo.svg',
  '011-spaceship.svg',
  '014-ufo.svg',
  '017-alien.svg',
  '020-ufo.svg',
  '023-ufo.svg',
  '026-spaceship.svg',
  '029-abduction.svg',
  '003-radar.svg',
  '006-ufo.svg',
  '009-spaceship.svg',
  '012-alien.svg',
  '015-wormhole.svg',
  '018-scan.svg',
  '021-alien.svg',
  '024-top',
  'secret.svg',
  '027-alien.svg',
  '030-spaceship.svg',
]

const Award = ({i, isNew}) => {
  const ref = useRef()
  useEffect(() => {
    if (isNew) ref.current.scrollIntoView({ behavior: 'smooth' })
  }, [isNew])
  return <img ref={ref} src={`./awards/${awards[i % awards.length]}`} className={`${isNew && 'new'} award ${i}`} />
}

export default Award