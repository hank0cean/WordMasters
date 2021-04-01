
import React, { useEffect, useState } from 'react';
import GameApi from '../api/game';

import DecksLogin from './../components/decksLogin'
import DecksOptions from './../components/decksOptions'

import './../styles/homeContainer.css'


function DeckEditorContainer() {
    let [key, setKey] = useState(null);
    let [isLoading, setIsLoading] = useState(true);

    return (
      <div className="homeContainer">
        <div className="homeHeader">
          <h1>SpyWords Deck Editor</h1>
        </div>
          <DecksLogin>
            <DecksOptions>
              {/* <DeckEditor /> */}
            </DecksOptions>
          </DecksLogin>
      </div> 
    );
}

export default DeckEditorContainer;
