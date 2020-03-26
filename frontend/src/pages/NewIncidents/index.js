import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

import './style.css'
import { FiArrowLeft } from 'react-icons/fi'
import Logo from '../../assets/logo.svg'

export default function NewIncidents(){

    
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const history = useHistory()
    
    const ongId = localStorage.getItem('ongId')
    async function handleNewIncident(e){
        e.preventDefault()
        const data = { title, description, value }
        try {
            await api.post('incidents', data, {
                headers: {
                    authorization: ongId
                }
            })
            history.push('/profile')
        } catch (error) {
            alert('Erro ao cadastrar o novo caso. Tente novamente.')
        }
    }

    return (
        <div className="new-incidents-container">
        <div className="content">
            <section>
                <img src={Logo} alt="Be The Hero"/>
                <h1>Cadastrar novo caso</h1>
                <p>
                    Descreva o caso detalhadamente para encontrar um herói para resolver isso.
                </p>
                <Link to="/profile" className="back-link">
                    <FiArrowLeft size={16} color="#e02041" />
                    Voltar para home
                </Link>
            </section>
                <form onSubmit={handleNewIncident}>
                    <input type="text" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Título do Caso" />
                    <textarea 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Descrição"></textarea>
                    <input type="text" 
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Valor em reais"/>

                    <button type="submit" className="button">Cadastrar</button>
                </form>
        </div>
    </div>
    )
}