import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
const Login = () =>{
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email:"",
        password:""
    })
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    })
    const handleChange = (e) =>{
        setUser(
            {
                ...user,
                [e.target.name]:e.target.value
            }
        )
    }

    const handleLogin = async(e) =>{
        e.preventDefault();
        let result = await fetch('http://localhost:5000/login',{
            method:"POST",
            body:JSON.stringify({...user}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        result = await result.json();
        console.log(result,'result')
        if(result.auth){
            localStorage.setItem('user',JSON.stringify(result.user));
            localStorage.setItem('auth',JSON.stringify(result.auth));
            navigate('/')
        }
        else{
            alert('no user found...')
        }
        setUser({
            email:"",
            password:""
        })
    }
    return (
        <> 
        <div className="signup-form">
            <h1 style={{textAlign:'center'}}>Login...</h1>
            <form >
                <input type="text" value={user.email} onChange={(e)=>handleChange(e)} id="email" name="email" placeholder="Enter email..."/>
                <input type="text" value={user.password} onChange={(e)=>handleChange(e)} id="password" name="password" placeholder="Enter password..."/>
                <button onClick={(e)=>handleLogin(e)} className="submit" >Login</button>
                <p>You have not a register? <a href='/signup'>Signup...</a> </p>

             </form>
        </div>
            
        </>
    )
}


export default Login;