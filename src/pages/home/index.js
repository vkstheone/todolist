import 'bootstrap/dist/css/bootstrap.min.css'
import * as Icon from 'react-bootstrap-icons'
import React, {useState, useEffect, useMemo, useCallback} from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConnection';

function Home() {
    const [email, setEmail ] = useState('')
    const [password, setPassword ] = useState('')
    const navigate = useNavigate();
    
    async function hadlleLogin(e){
        e.preventDefault()

        if(email !=='' && password !==''){
            await signInWithEmailAndPassword (auth, email, password)
            .then(() =>{
                navigate('/admin',{replace: true})
            })
            .catch(() =>{
                alert('email e senha errado')
            })
        }else{
            alert('Prencha todos os campos')
        }
    }

  return (
    <div className='container mt-t'   >
        <div className='row justify-content-center'>
            <div className='col-md-6'>
                <h1 className='text-center'>
                    <Icon.CardChecklist className='me-3' color='royalblue' size='38'/>
                    ToDo List
                </h1>
                <div className='card shadow mt-5'>
                    <div className='card-header text-center'>
                        <h4>Login</h4>
                    </div>
                    <div className='card-body'>
                        <form onSubmit={hadlleLogin}>
                            <div className='mb3'>
                                <label className='form-label'>E-mail</label>
                                <input type='email' className='form-control' placeholder='Digite seu email' 
                                value={email} onChange={(e) =>{setEmail(e.target.value)}}/>
                            </div>
                              <div className='mb3'>
                                <label className='form-label'>Senha</label>
                                <input type='password' className='form-control' placeholder='Digite sua senha'
                                value={password} onChange={(e) =>{setPassword(e.target.value)}}/>
                            </div>
                            <button className='btn btn-primary w-100 mt-3'>Entrar</button>
                            <p className='text-center mt-3'> {'Não tem uma conta? '}     
                                <Link to="/register">
                                    Cadastre-se
                                </Link>
                            </p>
                        </form>
                    </div>

                </div>

            </div>

        </div>
     
    </div>
 );
}

export default Home;
