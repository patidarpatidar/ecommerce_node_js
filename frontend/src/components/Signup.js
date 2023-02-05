import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
const Signup = () =>{
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name:"",
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

    const handleSubmit = async(e) =>{
        e.preventDefault();
        let result = await fetch('http://localhost:5000/register',{
            method:"POST",
            body:JSON.stringify({...user}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        result = await result.json();
        localStorage.setItem('user',JSON.stringify(result.user));
        if(result){
            navigate('/')
        }
        setUser({
            name:"",
            email:"",
            password:""
        })
    }
    return (
        <> 
        <div className="signup-form">
            <h1 style={{textAlign:'center'}}>Signup...</h1>

            <form >
                <input type="text" value={user.name} onChange={(e)=>handleChange(e)} id="name" name="name" placeholder="Enter name..." />
                <input type="text" value={user.email} onChange={(e)=>handleChange(e)} id="email" name="email" placeholder="Enter email..."/>
                <input type="text" value={user.password} onChange={(e)=>handleChange(e)} id="password" name="password" placeholder="Enter password..."/>
                <button onClick={(e)=>handleSubmit(e)} className="submit" >Submit</button>
                <p>You have already register? <a href='/login'>Login...</a> </p>
             </form>
        </div>
            
        </>
    )
}


export default Signup;