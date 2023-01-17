import { useState } from "react";
import {useNavigate} from 'react-router-dom';
const Signup = () =>{
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:""
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
            <form >
                <input type="text" value={user.name} onChange={(e)=>handleChange(e)} id="name" name="name" placeholder="Enter name..." />
                <input type="text" value={user.email} onChange={(e)=>handleChange(e)} id="email" name="email" placeholder="Enter email..."/>
                <input type="text" value={user.password} onChange={(e)=>handleChange(e)} id="password" name="password" placeholder="Enter password..."/>
                <button onClick={(e)=>handleSubmit(e)} className="submit" >Submit</button>
             </form>
        </div>
            
        </>
    )
}


export default Signup;