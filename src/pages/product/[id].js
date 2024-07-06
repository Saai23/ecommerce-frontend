import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import API from '../../utils/api';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const { dispatch, cart } = useCart();
  console.log(cart)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/products/${id}/`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const addToCart = () => {
    if (!product) return;
    dispatch({ type: 'ADD_TO_CART', payload: product });
    alert(`${product.name} Added`);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container productDetail">
      <h1 className="productTitle">{product.name}</h1>
      <p className="productDescription">{product.description}</p>
      <p className="productPrice">${product.price}</p>
      <div className="buttons">
        <button className="button" onClick={addToCart}>Add to Cart</button>
        <Link href="/cart">
          <span className="linkButton">Go to Cart</span>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
