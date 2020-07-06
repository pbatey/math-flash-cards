import React, { seState, useState, useEffect } from 'react'

const Award = ({name, className, onClick, hideOnClick, onHidden, hover}) => {
  const [hovering, setHovering] = useState(false)
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    let handle
    if (hiding) handle = setTimeout(() => {
      setHiding(false)
      if (onHidden) onHidden()
    }, 500)
    return () => clearTimeout(handle)
  }, [hiding])

  const handleClick = () => {
    if (hideOnClick) setHiding(true)
    if (onClick) onClick()
  }
  const empty = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
  const src = name ? `./awards/${name}` : empty

  return <img
    className={`${className} award ${hovering && !hiding ? 'hover' : ''} ${hiding ? 'hiding' : ''}`}
    src={src}
    onClick={handleClick}
    onMouseEnter={() => hover && setHovering(true)}
    onMouseLeave={() => hover && setHovering(false)}/>
}

export default Award