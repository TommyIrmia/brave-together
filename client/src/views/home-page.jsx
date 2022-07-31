import { useNavigate } from "react-router-dom"

export function HomePage() {
    const navigate = useNavigate()

    const onClickStart = () => { 
        navigate('/about')
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
                    <section className="call-to-action-section align-start">
                        <p><span className="bold">לקרוא</span> סיפורי גבורה, העצמה אישית וסיפורים מעוררי השראה.</p>
                        <p><span className="bold">לבחור</span> ציטוט אותו תרצו לשתף, בין אם זה ביום הזיכרון, בחגי ישראל, בימים המיוחדים לכם או פשוט בשגרה.</p>
                        <p><span className="bold">לעצב</span> לעצב אותו באתר ולשתף היכן שתרצו.</p>
                        <button onClick={onClickStart} className="primary-btn">
                            התחל
                        </button>
                    </section>
                </section>
            </div>
        </div>
    </div>
}
