import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

import './style.css'
import { FiArrowLeft } from 'react-icons/fi'
import Logo from '../../assets/logo.svg'


export default function Register(){
    const [name, setName] = useState(''),
        [telefone, setTelefone] = useState(''),
        [cidade, setCidade] = useState(''),
        [uf, setUf] = useState(''),
        [email, setEmail] = useState('')

        const history = useHistory()

    async function handleRegister(e){
        e.preventDefault()

        const data = {
            name, email, telefone, cidade, uf
        }

        try {
            const response = await api.post('ongs', data)
            alert(`Seu ID de acesso ${response.data.id}`)

            history.push('/')
        } catch (error) {
            alert("Erro no cadastro, tente novamente.")
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={Logo} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>
                        Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.
                    </p>
                    <Link to="/" className="back-link">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para o logon
                    </Link>
                </section>
                    <form onSubmit={handleRegister}>
                        <input type="text" 
                            placeholder="Nome da Ong"
                            value={name}
                            onChange={e => setName(e.target.value)} 
                         />
                        <input type="email" 
                            placeholder="E-mail" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}    
                        />
                        <input type="text" 
                            placeholder="Telefone"
                            value={telefone}
                            onChange={e => setTelefone(e.target.value)} 
                        />

                        <div className="input-group">
                            <input type="text" 
                                placeholder="Cidade"
                                value={cidade}
                                onChange={e => setCidade(e.target.value)} 
                            />
                            <input type="text" 
                                placeholder="UF" style={{ width: 80}}
                                value={uf}
                                onChange={e => setUf(e.target.value)} />
                        </div>

                        <button type="submit" className="button">Cadastrar</button>
                    </form>
            </div>
        </div>

    )
}