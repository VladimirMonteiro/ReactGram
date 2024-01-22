import './Auth.css'


import { Link } from 'react-router-dom' 
import Message from '../../components/message/Message'


// Hooks

import { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { login, reset } from '../../slices/authSlice'


const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //Use dispatch serve para realizar uma ação
    const dispatch = useDispatch()

    //Use selector serve para pegar um estado
    const {loading, error} = useSelector((state) => state.auth)


    const handleSubmit = (e) => {
        e.preventDefault()

        const user = {
            email,
            password
        }

        dispatch(login(user))
    }

    //Clean all auth states

    useEffect(()=> {
        dispatch(reset())
    }, [dispatch])

    return(
        <section id='login'>
            <h2>ReactGram</h2>
            <p>Faça o login para ver oque há de novo.</p>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='E-mail'  onChange={(e)=> setEmail(e.target.value)} value={email || ""}/>
                <input type="password" placeholder='Senha' onChange={(e)=> setPassword(e.target.value)} value={password || ""}/>
                {!loading && <input type="submit" value='Entrar' />}
                {loading && <input type="submit" value='Aguarde...' />}
                {error && <Message msg={error} type='error'/>}
            </form>
            <p>Não possui conta? <Link to='/register'>Clique aqui!</Link></p>
           
        </section>

    )
}


export default Login