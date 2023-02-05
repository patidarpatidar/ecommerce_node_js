import React, { useEffect, useState } from "react";
import { json, Link } from "react-router-dom";

const ProductList = () =>{
    const [products,setProducts] = useState([]);
    useEffect(()=>{
        getProducts();
    },[])

    const getProducts = async()=>{
        let result = await fetch('http://localhost:5000/products',{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('auth'))}`
            }
        });
        result = await result.json();
        setProducts(result);
    }
    const handleDelete = async(pid) =>{
        let result = await fetch(`http://localhost:5000/product/${pid}`,{
            method:"DELETE",
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('auth'))}`
            }
        });
        result = result.json();
        if(result){
            getProducts();
        }
    }
    const handleSearch = async(event)=>{
        const key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('auth'))}`
                }
            })
        result = await result.json();
        if(result){
            setProducts(result)
            console.log(result)
        }
        }
        else{
            getProducts()
        }
        
    }
    return (
        <>
            <h1>Product List...</h1>
            <input placeholder="Search...." onChange={handleSearch}
            style={{
                padding:'3px',
                margin:'10px'
            }}
            />
            <table border={2} className='responsive-table'>
                <thead>
                    <tr>
                    <th>Sno.</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Company</th>
                    <th>Operation</th>
                    </tr>
                  
                </thead>
                <tbody>
                    {
                        products.length >0 ?
                         products.map((product,index)=>{
                            return(
                                <>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.company}</td>
                                    <td>
                                        <button onClick={()=>handleDelete(product._id)}>Delete </button> 
                                        <Link to={`update/${product._id}`}> Update</Link>
                                    </td>
                                </tr>
                                </>
                            )
                        }):
                        <h1>No Product found...</h1>
                    }
                </tbody>
            </table>
        </>
    )
}

export default ProductList;