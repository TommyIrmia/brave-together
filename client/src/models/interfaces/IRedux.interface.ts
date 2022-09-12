import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../store/store'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export interface QuoteModule {
    quote?: Quote;
    quotes?: Quote[];
    totalQuotesCount?: number;
    isSharing?: boolean;
    filterBy?: {
        text?: string;
        page?: number;
        quotesPerPage?: number;
    }
}

export interface Quote {
    _id?: string;
    owner?: {
        _id?: string;
        email?: string;
    };
    story: {
        _id?: string;
        title?: string;
        heroName?: string;
    };
    background: {
        type?: string;
        attr?: string;
    };
    imgs?: string[];
    frame?: string;
    txt?: {
        content?: string;
        fontSize?: number;
        fontFamily?: string;
        fontColor?: string;
        pos?: {
            x: number;
            y: number;
        }
    }
    collection?: string;
    imgUrl?: string;
}

