import React from 'react'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
// import { login } from '../../store/user/user.action'
// import { query } from '../../store/story/story.action'

export const QuoteApp = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        // dispatch(login({ hello: 'world' }))
        // dispatch(query())

    })
    return (
        <div>QuoteApp</div>
    )
}
