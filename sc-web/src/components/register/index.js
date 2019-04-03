import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Container, Form} from './style';
import  api  from '../../services/api';

function Register(props) {
    
    const [user, setUser] = useState({name: '', surname: '', username: '', email: '', password: ''});
    const [erro, setErro] = useState('');

    const updateField = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };
    async function handleRegister() {
        const { name, surname, username, email, password } = user;
        if(!name || !surname || !username || !email || !password ){
            setErro('Preencha os dados corretamente')
        } else {
            try {
                await api.post('/v1/auth/register', { name, surname, username, email, password })
                props.history.push('/')
            
            } catch (error) {
                console.log(error)
                setErro('Não foi possível cadastrar usuário')
            }

        }  
    }
    
    return (
        <Container>
            <Form>
                { erro && <p>{erro}</p>}
                <input 
                    type="text" 
                    placeholder="Nome" 
                    name="name" 
                    value={user.name}
                    onChange={ updateField }
                />
                <input 
                    type="text" 
                    placeholder="Sobrenome" 
                    name="surname" 
                    value={user.surname}
                    onChange={ updateField }
                />
                <input 
                    type="text" 
                    placeholder="Usuário" 
                    name="username" 
                    value={user.username}
                    onChange={ updateField }
                />
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
                <button type="button" onClick={() => handleRegister()}>Registrar</button>
                <hr />
                <Link to="/">Login</Link>
            </Form>
        </Container>
    )
}

export default withRouter(Register)