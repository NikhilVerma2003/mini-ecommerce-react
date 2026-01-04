import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=20")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    console.log("Add to cart:", product.title);
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div>
      <h2>Products</h2>
      <ProductList products={products} onAddToCart={handleAddToCart} />
    </div>
  );
}

export default Home;
