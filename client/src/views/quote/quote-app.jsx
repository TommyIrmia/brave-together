import React from 'react'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { login } from '../../store/user/user.actions'

export const QuoteApp = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(login({ hello: 'world' }))
    })
    return (
        <div>QuoteApp</div>
    )
}
