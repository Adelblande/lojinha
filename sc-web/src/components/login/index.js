import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Container, Form} from './style';
import  api  from '../../services/api';

function Login(props) {
    
    const [user, setUser] = useState({email: '', password: ''});
    const [erro, setErro] = useState('')
    
    const updateField = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };
    async function handleSignin() {
        const { email, password } = user;

        if(!email || !password){
            setErro('Preencha E-mail e Senha')
        }else{
            setErro('')
            try {
                const { data } = await api.post('/v1/auth/login', { email, password })
                await localStorage.setItem('@somoscorujinhas', data.user.token)
                props.history.push('/vitrine')
                console.log(data)
                
            } catch (error) {
                setErro('Usuário ou Senha inválida')
            }
        }

        
    }
    
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
                <Link to="/register">Cadastro</Link>
            </Form>
        </Container>
    )
}

export default withRouter(Login)