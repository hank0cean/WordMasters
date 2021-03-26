import React from 'react'

import NewGame from './../components/newGame'

import './../styles/homeContainer.css'

function HomeContainer() {

  return (
    <div className="homeContainer">
      <div className="homeHeader">
        <h1>SpyWords</h1>
      </div>
      <NewGame />
    </div>
  )
}

export default HomeContainer;
