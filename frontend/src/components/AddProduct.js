import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
const AddProduct = () =>{
    // const navigate = useNavigate();
    const [product, setProduct] = useState({
        name:'',
        price:'',
        category:'',
        company:'',
    })
    // useEffect(()=>{
    //     const auth = localStorage.getItem('user');
    //     if(auth){
    //         navigate('/')
    //     }
    // })
    const handleChange = (e) =>{
        setProduct(
            {
                ...product,
                [e.target.name]:e.target.value
            }
        )
    }

    const handleAddProduct = async(e) =>{
        e.preventDefault();
        if(product.name && product.price && product.category && product.company ){
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch('http://localhost:5000/add-product',{
            method:"POST",
            body:JSON.stringify({...product,userId}),
            headers:{
                'Content-Type':'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('auth'))}`
                
            }
        })
        result = await result.json();
        console.log(result,'result')
        
       
        setProduct({
            name:'',
            price:'',
            category:'',
            company:'',
        })
        alert('product added')
    }
    else{
        console.log('plz enter all field')
    }
    }
    return (
        <> 
        <div className="signup-form">
            <h1 style={{textAlign:'center'}}>Add Product...</h1>
            <form >
                <input type="text" value={product.name} onChange={(e)=>handleChange(e)} id="name" name="name" placeholder="Enter name..."/>
                <input type="text" value={product.price} onChange={(e)=>handleChange(e)} id="price" name="price" placeholder="Enter price..."/>
                <input type="text" value={product.category} onChange={(e)=>handleChange(e)} id="category" name="category" placeholder="Enter cotegory..."/>
                <input type="text" value={product.company} onChange={(e)=>handleChange(e)} id="company" name="company" placeholder="Enter company..."/>
                <button onClick={handleAddProduct} className="submit" >Add Product</button>

             </form>
        </div>
            
        </>
    )
}


export default AddProduct;