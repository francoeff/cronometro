import {useEffect, useState} from "react";

export const useCronometro = ( timeDefault = 0 ) => {
    const [time, setTime] = useState( timeDefault );
    const [isTimeRunning, setIsTimeRunning] = useState( false );

    useEffect( () => {
        if (isTimeRunning) {
            const id = window.setInterval(() => {
                setTime(time => time + 0.1 )
            }, 100)
            return () => window.clearInterval(id)
        }
        return undefined
    }, [isTimeRunning]);

    const handlePlayPause = () => {
        setIsTimeRunning(!isTimeRunning)
    }

    const resetTime = () => {
        setIsTimeRunning(false)
        setTime(0)
    }

    return { time, isTimeRunning, handlePlayPause, resetTime }
}