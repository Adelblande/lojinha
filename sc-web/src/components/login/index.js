import React, { useState } from 'react';

import { Container, Form} from './style';
import  api  from '../../services/api';

export default function Login() {
    
    const [user, setUser] = useState({email: '', password: ''});
    
    async function handleSignin() {
        console.log(user);
        const { email, password } = user;
        await api.post('/v1/auth/login', { email, password })
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
                <input 
                    type="email" 
                    placeholder="E-mail" 
                    name="email" 
                    value={user.email}
                    onChange={ updateField }
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    name="password"
                    value={user.password}
                    onChange={ updateField }
                />
                <button type="button" onClick={handleSignin}>Entrar</button>
            </Form>
        </Container>
    )
}