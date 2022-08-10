import { useState } from "react"
import { useLocation, useNavigate, Link } from "react-router-dom"

export function LoginSignup() {

    const navigate = useNavigate()
    const location = useLocation()
    const [userDetails, setUserDetails] = useState({ username: '', password: '', phone: '', mail: '' })

    const handleChange = ({ target }) => {
        const { name, value } = target
        setUserDetails({ ...userDetails, [name]: value })
    }

    const clearForm = () => {
        setUserDetails({ username: '', password: '', phone: '', mail: '' })
    }

    const onSubmit = () => { 
        location.pathname === '/login' ? onLogin() : onSignup()
    }

    const onLogin = (ev = null) => { 
        if(ev) ev.preventDefault()
        if(!userDetails.username || !userDetails.password) return
        clearForm()
    }

    const onSignup = (ev = null) => { 
        if(ev) ev.preventDefault()
        if(!userDetails.username || !userDetails.password || !userDetails.mail || !userDetails.phone) return
        clearForm()
    }

    const onChangeForm = () => {
        location.pathname === '/login' ? navigate('/signup') : navigate('/login')
    }

    return <section className="register-modal">
        <form className="register-modal__form">
            <input className="register-modal__input" name="username" onChange={handleChange} type="text" placeholder="הכניסו שם" />
            {location.pathname === '/signup' && <> <input className="register-modal__input" name="phone" onChange={handleChange} type="text" placeholder="הכניסו פלאפון" />
                <input className="register-modal__input" name="mail" onChange={handleChange} type="text" placeholder="הכניסו מייל" /></>}
            <input className="register-modal__input" name="password" onChange={handleChange} type="text" placeholder="הכניסו סיסמא" />
            <div className="password-options">
                <div className="password-options__remmember-user">
                    <input className="password-options__input" type="checkbox" name="" id="" />
                    <label>זכור אותי</label>
                </div>
                <Link to={'/'} className='password-options__forget-password-link'>שכחת סיסמא?</Link>
            </div>
            <button className="register-modal__cta-btn cta-btn" onClick={onSubmit}>התחבר</button>
        </form>
        <div className="register-modal__alternatives-container">
            <div className="register-modal__or-seperator">
                <div className="border"></div>
                <p>או</p>
                <div className="border"></div>
            </div>
            <button className="register-modal__facebook-btn">התחבר באמצעות פייסבוק</button>
            <button className="register-modal__google-btn">התחבר באמצעות גוגל</button>
            <button className="register-modal__alternative-btn" onClick={onChangeForm}>{location.pathname === '/signup' ? 'התחבר עם חשבון קיים' : 'הירשם'}</button>
            <Link to={'/'} className='register-modal__skip-link'>דלגו לבינתיים </Link>
        </div>
    </section>
}