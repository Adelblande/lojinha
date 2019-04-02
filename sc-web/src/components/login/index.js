import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Container, Form} from './style';
import  api  from '../../services/api';

export default function Login() {
    
    const [user, setUser] = useState({email: '', password: ''});
    const [erro, setErro] = useState('')
    
    async function handleSignin() {
        const { email, password } = user;

        if(!email || !password){
            setErro('Preencha E-mail e Senha')
        }else{
            setErro('')
            try {
                const { data } = await api.post('/v1/auth/login', { email, password })
                await localStorage.setItem('@somoscorujinhas', data.token)
                console.log(data)
                
            } catch (error) {
                setErro('Usuário ou Senha inválida')
            }
        }

        
    }
    const updateField = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };
    return (
        <Container>
            <Form>
                { erro && <p>{erro}</p>}
                <input 
                    type="email" 
                    placeholder="E-mail" 
                    name="email" 
                    value={user.email}
                    onChange={ updateField }
                />
                <input 
                    type="password" 
                    placeholder="Senha"
                    name="password"
                    value={user.password}
                    onChange={ updateField }
                />
                <button type="button" onClick={() => handleSignin()}>Entrar</button>
                <hr />
                <Link to="/register">Cadastre-se</Link>
            </Form>
        </Container>
    )
}