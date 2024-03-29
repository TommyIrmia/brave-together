import React, { useEffect, useRef, useState } from 'react'

import { FacebookShareButton, WhatsappShareButton, TwitterShareButton, EmailShareButton, TelegramShareButton, EmailIcon, TelegramIcon, FacebookIcon, WhatsappIcon, TwitterIcon } from 'react-share'
// import HeaderMetaData from './HeaderMetaData/HeaderMetaData';

import { getUploadManager } from '../../services/aws.service'
import { useSelector } from 'react-redux'

export const Share = ({ isOpen, onClose }) => {
  const { quote } = useSelector((globalState) => globalState.quoteModule)
  const [imgUrl, setImgUrl] = useState(quote?.imgUrl)
  const [isFetching, setIsFetching] = useState(false)

  const downloadRef = useRef(null)

  const onDownloadImg = () => {
    downloadRef.current.href = imgUrl
  }

  return (
    <>
      <section className={'share-options-container ' + (isOpen ? `shown` : 'hidden')}>
        {/* <HeaderMetaData title="Title" description='Description' imgUrl={imgUrl} /> */}

        {isFetching && <div>מכין את התמונה שלך, כמה רגעים...</div>}

        {/* {!isFetching && ( */}
        <>
          {/* {!imgUrl && isOpen && <h6>שגיאה, אנא חזרו לעמוד יצירת הסיפור</h6>} */}

          {/* {!imgUrl && isOpen && ( */}
          <div className="share-options">
            <div className="share-option-container">
              <WhatsappShareButton url={imgUrl}>
                <WhatsappIcon size={50} round={true} />
              </WhatsappShareButton>
              <span>WhatsApp</span>
            </div>

            <div className="share-option-container">
              <a onClick={onDownloadImg} ref={downloadRef} target="_blank" download="Brave-Together.jpg" title="Brave-Together" href="#">
                <img className="download-icon" src="https://cdn.iconscout.com/icon/free/png-256/download-button-1723003-1465295.png" alt="" srcSet="" />
              </a>
              <span>Download</span>
            </div>

            <div className="share-option-container">
              <FacebookShareButton url={imgUrl}>
                <FacebookIcon size={50} round={true}></FacebookIcon>
              </FacebookShareButton>
              <span>Facebook</span>
            </div>

            <div className="share-option-container">
              <TwitterShareButton url={imgUrl}>
                <TwitterIcon size={50} round={true} />
              </TwitterShareButton>
              <span>Twitter</span>
            </div>

            <div className="share-option-container">
              <EmailShareButton url={imgUrl}>
                <EmailIcon size={50} round={true} />
              </EmailShareButton>
              <span>Mail</span>
            </div>

            <div className="share-option-container">
              <TelegramShareButton url={imgUrl}>
                <TelegramIcon size={50} round={true} />
              </TelegramShareButton>
              <span>Telegram</span>
            </div>
          </div>
          {/* )} */}
        </>
        {/* )} */}
      </section>
      <div className={'screen ' + (isOpen ? `shown` : 'hidden')} onClick={onClose}></div>
    </>
  )
}
