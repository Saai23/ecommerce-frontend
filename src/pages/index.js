import { useEffect, useState } from 'react';
import API from '../utils/api';
import Link from 'next/link';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get('/products/');
        setProducts(response.data); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container productCatalogue">
      <h1>Product Catalogue</h1>
      <ul>
        {products.length > 0 ? (
          products.map(product => (
            <li key={product.id}>
              <Link href={`/product/${product.id}`}>
                {product.name}
              </Link>
            </li>
          ))
        ) : (
          <p>No products available</p>
        )}
      </ul>
    </div>
  );
};

export default Home;
