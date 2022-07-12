const colors = [
    '#C2DDC8',
    '#99BFB3',
    '#E2C547',
    '#CDD1CC',
    '#ACACAC',
    '#D9C1B8',
    '#D97373',
    '#2E5559'
];

const drawings = [
    'imgs/consts/drawings/1.png',
    'imgs/consts/drawings/2.png',
    'imgs/consts/drawings/3.png',
    'imgs/consts/drawings/4.png',
    'imgs/consts/drawings/5.png',
    'imgs/consts/drawings/6.png',
    'imgs/consts/drawings/7.png',
    'imgs/consts/drawings/8.png',
    'imgs/consts/drawings/9.png',
    'imgs/consts/drawings/10.png',
];

const patterns = [
    'imgs/consts/patterns/1.png',
    'imgs/consts/patterns/2.png',
    'imgs/consts/patterns/3.png',
    'imgs/consts/patterns/4.png',
    'imgs/consts/patterns/5.png',
]
const photos = [
    'imgs/consts/photos/1.png',
    'imgs/consts/photos/2.png',
    'imgs/consts/photos/3.png',
    'imgs/consts/photos/4.png',
    'imgs/consts/photos/5.png',
]

const fonts = [
    'Arial, Helvetica, sans-serif',
    'Courier New, Courier, monospace',
    'Franklin Gothic Medium, Arial Narrow, Arial, sans-serif',
    'Times New Roman, Times, serif',
    'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif',
];

const stillImgs = [
    'imgs/consts/stillimgs/1.png',
    'imgs/consts/stillimgs/2.png',
    'imgs/consts/stillimgs/1.png',
    'imgs/consts/stillimgs/2.png',
];

const natureImgs = [
    'imgs/consts/natureimgs/1.png',
    'imgs/consts/natureimgs/2.png',
    'imgs/consts/natureimgs/3.png',
    'imgs/consts/natureimgs/4.png',
    'imgs/consts/natureimgs/5.png',
    'imgs/consts/natureimgs/6.png',
    'imgs/consts/natureimgs/7.png',
    'imgs/consts/natureimgs/8.png',
    'imgs/consts/natureimgs/9.png',
    'imgs/consts/natureimgs/10.png',

]

const txtSizes = [
    10, 12, 14, 16, 18, 20
];

const frames = [
    'imgs/consts/frames/1.png',
    'imgs/consts/frames/2.png',
    'imgs/consts/frames/3.png',
    'imgs/consts/frames/4.png',
]

const options = [
    {
        type: 'text',
        subTypes: [
            { type: 'font', name: 'פונט', isChosen: true },
            { type: 'color', name: 'צבע', isChosen: false },
            { type: 'size', name: 'גודל', isChosen: false },
        ]
    },
    {
        type: 'img',
        subTypes: [
            { type: 'nature', name: 'טבע', isChosen: true },
            { type: 'still', name: 'דומם', isChosen: false },
            { type: 'symbol', name: 'סמלים', isChosen: false },
        ]
    },

    {
        type: 'frame',
        subTypes: []
    },
    {
        type: 'background',
        subTypes: [
            { type: 'color', name: 'צבע', isChosen: true },
            { type: 'pattern', name: 'תבניות', isChosen: false },
            { type: 'drawing', name: 'איורים', isChosen: false },
            { type: 'photo', name: 'צילומים', isChosen: false }
        ]
    },
]

export {
    colors,
    drawings,
    photos,
    patterns,
    fonts,
    stillImgs,
    natureImgs,
    txtSizes,
    frames,
    options
}