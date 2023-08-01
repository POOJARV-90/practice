import React, { useEffect, useState } from 'react'
import '../component/Allproducts.css'
import { useNavigate } from 'react-router-dom';


const AllProducts = () => {
    const [isProductsExist, setIsProductsExist] = useState(false);
    const [products, setProducts] = useState([]);
    const router = useNavigate();

    // console.log(products, " - products")

    useEffect(() => {
        const productsFromDb = JSON.parse(localStorage.getItem("Products"))
        if (productsFromDb?.length) {
            setIsProductsExist(true);
            setProducts(productsFromDb)
        } else {
            setIsProductsExist(false)
            setProducts([])
        }
    }, [])

    const tosingleproduct = (id) =>{
        console.log(id,"id")
          router(`/Singlepoduct/${id}`)
    }

    return (
        <div id='pro-body'>
            {!isProductsExist ? <div>No products</div>
                :
                <div id='products'  >
                    {products && products.map((pro) => (
                        <div onClick={() => tosingleproduct(pro.id)} id='single-pro' key={pro.name} >
                            <div>
                            <img src={pro.image} />
                            </div>
                           
                            <p> {pro.name}</p>
                            <p>Category :{pro.category}</p>
                            <p>Price : ₹ {pro.price} </p>
                        </div>
                    ))}
                </div>

                
            }
        </div>
    )
}

export default AllProducts