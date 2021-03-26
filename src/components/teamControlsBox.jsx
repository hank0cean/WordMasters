import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function TeamControlsBox({teamName, username, spymaster}) {

    if (username === null) {
        // not logged in: show join team buttons for both teams

    }
    else {
        // logged in
        if (/*  CurrentTeam matches && spymaster not claimed for the team */true) {
            // return become spymaster button
            return (
                <></>
            )
        }
        else {
            // return no button controls (or maybe add: new board button for SM)

        }
    }
    {/* 
        {(loggedUser === null ?
          (teamName === 'Blue' ? 
            <Box ml="0.5rem" my="1rem">
            </Box>
          : 
            <Box my="1rem">
              <InputPopup buttonText="Join Red" buttonColor="secondary">
                <JoinTeamInput teamName="red" />
              </InputPopup>
            </Box>
          )
        : 
          (useSelector(state => state.spymaster) ?
            <></>
          :
            (teamName === 'Blue' ? 
              <Box ml="0.5rem" my="1rem">
                <Button type="submit" variant="contained" onClick={() => becomeSpymaster(gameRefID)} >
                  Become Spymaster
                </Button>
              </Box>
            : 
              <Box my="1rem">
                <Button type="submit" variant="contained" onClick={() => becomeSpymaster(gameRefID)} >
                  Become Spymaster
                </Button>
              </Box>
            )
          )
        )} */}

}

export default TeamControlsBox;