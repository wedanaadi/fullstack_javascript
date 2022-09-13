import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'

const ProductList = () => {
  const [products, setProducts] = useState([])

  useEffect(()=>{
    getProducts()
  },[])

  const getProducts = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE}/product`)
    setProducts(response.data) 
  }

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE}/product/${productId}`)
      getProducts()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mt-5">
      <Link to={`add`} className='button is-success mb-1'>Add New</Link>
      <div className="columns is-multiline">
        {products.map((product, index) => (
          <div className="column is-one-quarter" key={product.id}>
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={product.url} alt="Images" />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">{product.name}</p>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <Link to={`edit/${product.id}`} className="card-footer-item">Edit</Link>
                <a onClick={()=>deleteProduct(product.id)} className="card-footer-item">Delete</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList