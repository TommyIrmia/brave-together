import { ChosenSubOption } from "./chosen-sub-option"

export const OptionPreview = ({ onSetOption, isChosen, children, style = {}, imgSrc = null, className = '' }) => {

    return <div className={className} style={style} onClick={onSetOption}>
        {children && children}
        {imgSrc && <img src={imgSrc} alt="option-preview" />}
        <ChosenSubOption isChosen={isChosen} />
    </div >
}