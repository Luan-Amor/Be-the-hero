import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

import './style.css'
import Logo from '../../assets/logo.svg'
import { FiPower, FiTrash2 } from 'react-icons/fi'
 
export default function Profile(){
    const [incidents, setIncidents] = useState([])

    const ongName = localStorage.getItem('ongName')
    const ongId = localStorage.getItem('ongId')

    useEffect(() => {
        api.get('profile', {
            headers: {
                authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId])

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    authorization: ongId,
                }
            })
            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (error) {
            alert('Erro ao deletar o caso')
        }
    }
    const history = useHistory()
    function handleLogout(){
        localStorage.clear()
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={Logo} alt="Logo Be The Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/newincidents" >Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>
                <ul>
                    {incidents.map( (incident) => (
                        <li key={incident.id}>
                            <strong>Caso:</strong>
                            <p>{incident.title}</p>

                            <strong>Descrição</strong>
                            <p>{incident.description}</p>

                            <strong>Valor:</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                                <FiTrash2 size={20} color="#a8a8b3"/>
                            </button>
                        </li>
                    ))}
                    
                </ul>

        </div>
    )
}