import React from 'react';

import { ReactComponent as FacebookIcon } from '../assets/svgs/facebook.svg';
import { ReactComponent as InstagramIcon } from '../assets/svgs/instagram.svg';
import { ReactComponent as YoutubeIcon } from '../assets/svgs/youtube.svg';
import { ReactComponent as LinkdinIcon } from '../assets/svgs/linkdin.svg';
import { ReactComponent as GithubIcon } from '../assets/svgs/github.svg';



export const AppFooter = () => (
    <footer className="pv4 ph3 ph5-ns tc">
        <div className='social-icons-container'>
            <a href="https://www.facebook.com/BraveTogether2018" title="facebook">
                <FacebookIcon />
            </a>
            <a href='https://www.instagram.com/brave_together_insta/' title="instagram">
                <InstagramIcon />
            </a>
            <a href="https://www.youtube.com/channel/UCHry9px4UrXGZWgptKYm0EQ" title="youtube">
                <YoutubeIcon />
            </a>
            <a href="https://www.linkedin.com/company/brave-together-%D7%9E%D7%A6%D7%A2%D7%93-%D7%94%D7%92%D7%91%D7%95%D7%A8%D7%94/" title="linkdin">
                <LinkdinIcon />
            </a>
            <a href="https://github.com/gallib2/brave-together" title="github">
                <GithubIcon />
            </a>
        </div>
        <div className="mt4 text-buttons-container">
            <a href="#" className="f6 link dim gray dib mr3 mr4-ns">עזרה</a>
            <a href="#" className="f6 link dim gray dib mr3 mr4-ns">צור קשר</a>
            <a href="#" className="f6 link dim gray dib mr3 mr4-ns">אודות</a>
            <a href="https://brave-together.com/" className="f6 link dim gray dib mr3 mr4-ns">אתר רשמי</a>
        </div>
    </footer>
);
