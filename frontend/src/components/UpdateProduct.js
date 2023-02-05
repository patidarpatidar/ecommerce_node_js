import { useEffect, useState } from "react";
import {useNavigate, useParams} from 'react-router-dom';
const UpdateProduct = () =>{
    const [product, setProduct] = useState({
        name:'',
        price:'',
        category:'',
        company:'',
    })
   
    const params = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        getProductDetails();
    },[])
    const getProductDetails=async()=>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('auth'))}`
            }
        });
        result = await result.json()
        setProduct(result)
    }
    const handleChange = (e) =>{
        setProduct(
            {
                ...product,
                [e.target.name]:e.target.value
            }
        )
    }

    const handleUpdateProduct = async(e) =>{
        e.preventDefault();
        if(product.name && product.price && product.category && product.company ){
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            method:"PUT",
            body:JSON.stringify({...product,userId}),
            headers:{
                'Content-Type':'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('auth'))}`
            }
        })
        result = await result.json();
        if(result){
            setProduct({
                name:'',
                price:'',
                category:'',
                company:'',
            })
            navigate('/')
        }

       
    }
    else{
        console.log('plz enter all field')
    }
    }
    return (
        <> 
        <div className="signup-form">
            <h1 style={{textAlign:'center'}}>Update Product...</h1>
            <form >
                <input type="text" value={product.name} onChange={(e)=>handleChange(e)} id="name" name="name" placeholder="Enter name..."/>
                <input type="text" value={product.price} onChange={(e)=>handleChange(e)} id="price" name="price" placeholder="Enter price..."/>
                <input type="text" value={product.category} onChange={(e)=>handleChange(e)} id="category" name="category" placeholder="Enter cotegory..."/>
                <input type="text" value={product.company} onChange={(e)=>handleChange(e)} id="company" name="company" placeholder="Enter company..."/>
                <button onClick={handleUpdateProduct} className="submit" >Update Product</button>

             </form>
        </div>
            
        </>
    )
}


export default UpdateProduct;