import React, { useEffect, useState } from 'react'
import '../component/Allproducts.css'

const AllProducts = () => {
    const [isProductsExist, setIsProductsExist] = useState(false);
    const [products, setProducts] = useState();

    console.log(products, " - products")

    useEffect(() => {
        const productsFromDb = JSON.parse(localStorage.getItem("Products"))
        if (productsFromDb) {
            setIsProductsExist(true);
            setProducts(productsFromDb)
        } else {
            setIsProductsExist(false)
        }
    }, [])
    return (
        <div id='pro-body'>
            {!isProductsExist ? <div>No products</div>
                :
                <div id='products' >
                    {products && products.map((pro) => (
                        <div id='single-pro' key={pro.name}>
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