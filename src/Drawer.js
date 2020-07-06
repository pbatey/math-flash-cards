import React, { useState, Fragment } from 'react'

const Drawer = ({children}) => {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => {setOpen(!open)}

  return (
    <Fragment>
      <div className={`drawer ${open ? 'open' : ''}`}>
        {children}
      </div>
      <div className={`drawer-pull ${open ? 'open' : ''}`} onClick={toggleOpen}>&nbsp;</div>
    </Fragment>
  )
}

export default Drawer