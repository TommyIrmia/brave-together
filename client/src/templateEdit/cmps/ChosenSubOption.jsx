

import React from 'react'

export const ChosenSubOption = ({ isChosen }) => {

    if (!isChosen) return <></>
    return (
        <div className="chosen-sub-option"></div>
    )
}
