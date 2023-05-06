import React, {useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Error from './Error';
import useSelectElement from '../hooks/useSelectElement';
import {monedas} from '../data/monedas'

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFFFFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;
    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`;



const Formulario = ({setMonedas}) => {
    const [criptos, setCriptos] = useState([]);
    const [error, setError] = useState(false);
    const [moneda, SelectMonedas] = useSelectElement('Elige tu Moneda', monedas);
    const [criptomoneda, SelectCriptomoneda] = useSelectElement('Elige tu Criptomoneda', criptos);

    useEffect(() => {
        const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            const arrayCriptos = resultado.Data.map(cripto => {
                return {id: cripto.CoinInfo.Name, nombre: cripto.CoinInfo.FullName}
            })
            setCriptos(arrayCriptos);
        }
        consultarAPI();
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        if([moneda, criptomoneda].includes('')) {
            setError(true);
            return;
        }
        setError(false);
        setMonedas({
            moneda, 
            criptomoneda
        });
    }

    return (
        <>
            {error && (<Error>Todos los campos son obligatorios</Error>)}
            <form
            onSubmit={handleSubmit}
            >
                <SelectMonedas />
                <SelectCriptomoneda/>
                <InputSubmit type="submit" value="Cotizar"/>
            </form>
        </>
    )
}

export default Formulario