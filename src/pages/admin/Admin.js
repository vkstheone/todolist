import 'bootstrap/dist/css/bootstrap.min.css'
import * as Icon from 'react-bootstrap-icons'
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebaseConnection';
import { addDoc, collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';

function Home() {

    const [taskInput, setTaskInput] = useState('')
    const [user, setUser] = useState({})
    const [tarefas, setTarefas] = useState([])
    
    useEffect(() =>{
        async function loadTarefa() {
            const userDetail = localStorage.getItem('@datailUser');
            setUser(JSON.parse(userDetail))
            
            if(userDetail){
                const data = JSON.parse(userDetail);

                const tarefaRef = collection(db,'tarefas');
                const q = query(tarefas, orderBy("created", "desc"), where("userUid", "==", data?.uid));
                const unsub = onSnapshot(q,(snapshot)=>{
                    let lista = [];
                    snapshot.forEach((doc)=>{
                        lista.push({
                            id:doc.id,
                            tarefa:doc.data().tarefa,
                            userUid:doc.data().userUid
                        })
                    })
                    setTarefas(lista)
                })
            }else{
                console.log("Nehum Usuario encontrado")
            }
            
            
        }

        loadTarefa()



    },[]);

    async function handleRegister(e) {
        e.preventDefault();

        console.log('User:', user);

        if(taskInput ===''){
            alert('Digite uma tarefa')
        }else{
            await addDoc(collection(db, "tarefas"),{
                tarefa: taskInput,
                created: new Date(),
                userUid: user?.uid
            })
            .then(() =>{
                setTaskInput('')
                alert("Tarefa cadastrada com sucesso")
            })
            .catch((error)=>{
                console.log(error)
            })
        }
        
    }




    async function handleLogout(e){
        await signOut(auth)
    }

    return (
        <div className='container mt-t'   >
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <h1 className='text-center'>
                        <Icon.CardChecklist className='me-3' color='royalblue' size='38' />
                        ToDo List
                    </h1>
                    <div className='card shadow mt-5'>
                        <div className='card-header text-center'>
                            <h4>Lista de Tarefas</h4>
                        </div>
                        <div className='card-body'>
                            <div className='input-group mb-3'>

                                <input type='text' id='taskInput' className='form-control' placeholder='Adicionar nova tarefa' 
                                    value={taskInput} onChange={(e) =>{
                                        setTaskInput(e.target.value)
                                    }}
                                />
                                
                                <button className='btn btn-primary' onClick={handleRegister}>Adicionar</button>
                            </div>
                            <ul className='list-group'>
                                <li className='list-group-item d-flex justify-content-between align-itemns-center'>
                                    Estudar js

                                    <div>
                                        <button className='btn btn-warning btn-sm me-2'>
                                            <Icon.PencilSquare />
                                        </button>
                                        <button className='btn btn-success btn-sm me-2'>
                                            <Icon.Check2Square />
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className='card-footer text-center'>

                            <button className='btn btn-secondary btn-sm' onClick={handleLogout}>
                                <Icon.DoorClosed /> Fazer Logout
                            </button>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Home;
