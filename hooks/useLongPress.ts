import {useCallback, useRef} from "react"

export default function useLongPress({callback,duration=500}:{callback:(e:MouseEvent | TouchEvent)=>void; duration?:number}){
    const timeout = useRef(null)

    const onPressStart = useCallback((event:MouseEvent|TouchEvent)=>{
        event.preventDefault()

        timeout.current = setTimeout(()=>callback(event), duration)}, [callback, duration]
    )

    const cancelTimeout = useCallback(()=>clearTimeout(timeout.current),[])

    return {
        onMouseDown : onPressStart,
        onTouchStart:onPressStart,


        onMouseMove:cancelTimeout,
        onTouchMove:cancelTimeout,

        onMouseUp:cancelTimeout,
        onTouchEnd: cancelTimeout,
    }
}