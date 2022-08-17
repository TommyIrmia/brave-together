
import { BackgroundOptions } from './background-options'
import { FrameOptions } from './frame-options'
import { ImgOptions } from './img-options'
import { TextOptions } from './text-options'


export const DynamicOptions = ({ selectedOption, ...props }) => {
    switch (selectedOption.type) {
        case 'background':
            return <BackgroundOptions {...props} />
        case 'frame':
            return <FrameOptions {...props} />
        case 'img':
            return <ImgOptions {...props} />
        case 'text':
            return <TextOptions {...props} />
        default:
            return <></>
    }
}