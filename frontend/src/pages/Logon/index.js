import React, { useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

import { FiLogIn } from 'react-icons/fi'
import './styles.css'
import HeroesImg from '../../assets/heroes.png'
import Logo from '../../assets/logo.svg'



export default function Logon(){
    const [id, setId] = useState('')
    const history = useHistory()

    async function handleLogin(e){
        e.preventDefault()

        try {
            const response = await api.post('session', { id })

            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name)

            history.push('/profile')
        } catch (error) {
            alert('Erro na autenticação.')
        }

    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={Logo} alt="Logo"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input type="text" 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button type="submit" className="button">Entrar</button>

                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#e02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={HeroesImg} alt="Heroes" />
        </div>
    )
}