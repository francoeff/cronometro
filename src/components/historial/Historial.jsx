import React from 'react';
import './Historial.scss'

const Historial = ({ registros }) => {
    const renderRegistros = () => {
        return registros.map((registro, index) => (
            <tr key={registro.id}>
                <td width="50">{ index + 1 }</td>
                <td>{ registro.fecha }</td>
                <td width="100">{ registro.tiempo }</td>
                <td>{ registro.accion }</td>
            </tr>
        ))
    }
    return (
        <div className='historial'>
            <h2 className='historial__titulo'>Historial <small>({ registros.length } registros)</small></h2>
            <table className='historial__tabla'>
                <thead>
                <tr>
                    <th width="50">N°</th>
                    <th>Fecha</th>
                    <th width="100">Tiempo</th>
                    <th>Acción</th>
                </tr>
                </thead>
                <tbody>{ renderRegistros() }</tbody>
            </table>
        </div>
    );
};

export default Historial;