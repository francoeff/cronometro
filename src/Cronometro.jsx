import React, { useState, useEffect } from 'react';
import './scss/Cronometro.scss'
import Marcador from "./components/marcador/Marcador";
import Button from "./components/button/Button";
import { useCronometro } from "./hooks/Cronometro";
import Historial from "./components/historial/Historial";

const Cronometro = () => {
    const underTenFormat = num => num < 10 ? '0'+num : num;
    const urlApi = 'http://localhost:7000/v1/cronometro/'

    const { time, isTimeRunning, handlePlayPause, resetTime } = useCronometro();
    const timeFormat = time => {
        const hh = parseInt(time/60/60)
        const mm = parseInt((time-hh*3600)/60)
        const ss = (time%60).toFixed(2)
        return `${ underTenFormat(hh) }:${ underTenFormat(mm) }:${ underTenFormat(ss) }`
    }

    const findRecords = async () => {
        try {
            const api = await fetch(urlApi, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            return await api.json()
        } catch (e) {
            console.log(e)
            return []
        }
    }

    const saveAction = async ( time, action ) => {
        try {
            const fecha = new Date().toLocaleString("en-US", {timeZone: "America/Santiago"})

            const api = await fetch(urlApi, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({fecha, tiempo : time, accion : action})
            })

            if (api.ok) {
                const records = await findRecords()
                setRecords(records)
            } else console.log(api.error())
        } catch (e) {
            console.log(e)
        }
    }

    const [records, setRecords] = useState([]);

    useEffect(() => findRecords().then(setRecords), []);

    return (
        <div className='cronometro'>
            <h1 className='cronometro__titulo'>Cronómetro F.F.F. <img src="https://getonbrd-prod.s3.amazonaws.com/uploads/users/logo/10322/Captura_de_Pantalla_2021-04-27_a_la_s__16.21.36.png" alt=""/></h1>
            <Marcador time={ timeFormat( time ) } />
            <div className="cronometro__buttons">
                <Button
                    btnClass='btn-primary'
                    text={ !isTimeRunning ?
                            ( <><i className='fas fa-circle-play'></i> Iniciar </> )  :
                            ( <><i className='fas fa-circle-pause'></i> Pausar </> )
                    }
                    onClick={ () => {
                        saveAction(timeFormat(time), !isTimeRunning ? 'inicio' : 'pausa');
                        handlePlayPause();
                    }} />

                <Button
                    btnClass='btn-secondary'
                    text={(<><i className='fas fa-arrow-rotate-left'></i> Reiniciar</>)}
                    onClick={ () => {
                        saveAction(timeFormat(time), 'reinicio');
                        resetTime()
                    }} />
            </div>
            <Historial registros={ records } />
        </div>
    );
};

export default Cronometro;