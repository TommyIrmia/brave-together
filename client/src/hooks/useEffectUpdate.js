import { useEffect, useRef } from "react"

export const useEffectUpdate = (cb, dependencies) => {

    const isMount = useRef(false)

    useEffect(() => {
        if (!isMount.current) {
            isMount.current = true
            return
        }
        cb()
    }, dependencies)


}