import { useState } from "react"
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom"

export function HomePage() {
    const navigate = useNavigate()
    const location = useLocation()
    const [userDetails, setUserDetails] = useState({})

    const handleChange = ({ target }) => {
        const { name, value } = target
        setUserDetails({ ...userDetails, [name]: value })
    }

    console.log('userDetails:', userDetails);
    

    const onChangeForm = () => {
        location.pathname === '/login' ? navigate('/signup') : navigate('/login')
    }


    return <div className="home-page ">
        <div className="dark-fade-div">
            <div className="light-fade-div">
                <section className="home-layout">
                    <div className="home-header-content">
                        <div className="headers-container">
                            <h1>אנו מזמינים אותך ליצור</h1>
                            <h1 className="bold"># העצמה_אחת_ביום</h1>
                        </div>
                        <div className="align-start">
                            <p>בהשראת סיפורים של גיבורים וגיבורות מהשואה.</p>
                            <p>המוטו שלנו הוא "לעשות" ולא לשכוח.</p>
                        </div>
                    </div>
                    {/* Only Home */}
                    {location.pathname === '/' && <section className="call-to-action-section align-start">
                        <p><span className="bold">לקרוא</span> סיפורי גבורה, העצמה אישית וסיפורים מעוררי השראה.</p>
                        <p><span className="bold">לבחור</span> ציטוט אותו תרצו לשתף, בין אם זה ביום הזיכרון, בחגי ישראל, בימים המיוחדים לכם או פשוט בשגרה.</p>
                        <p><span className="bold">לעצב</span> לעצב אותו באתר ולשתף היכן שתרצו.</p>
                        <button onClick={() => {
                            navigate('/login')
                        }} className="cta-btn">
                            התחל
                        </button>
                    </section>}
                    {/* Login / Signup */}
                    {location.pathname !== '/' && <section className="register-modal">
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
                            <button className="register-modal__cta-btn cta-btn">התחבר</button>
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
                    </section>}
                </section>
            </div>
        </div>
    </div>
}
