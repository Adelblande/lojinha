import React, { useState } from 'react';

import { Container, Form} from './style';

export default function Login() {
    const [user, setUser] = useState([]);
    
    return (
        <Container>
            {user.email}
            {user.password}
            <Form>
                <input type="email" placeholder="E-mail"/>
                <input type="password" placeholder="Password"/>
                <button type="button" onClick={() => setUser({email: 'adelblande@gmail.com', password: '12345'})}>Entrar</button>
            </Form>
        </Container>
    )
}