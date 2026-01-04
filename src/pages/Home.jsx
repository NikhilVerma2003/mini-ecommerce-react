import { useEffect, useMemo, useState } from "react";
import ProductList from "../components/ProductList";
import Filters from "../components/Filters";
import Cart from "../components/Cart";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=20")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      result = result.filter((p) => p.category === category);
    }

    if (sort === "low-high") result.sort((a, b) => a.price - b.price);
    if (sort === "high-low") result.sort((a, b) => b.price - a.price);

    return result;
  }, [products, search, category, sort]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        if (existing.quantity >= product.stock) return prev;

        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const increaseQty = (item) => addToCart(item);

  const decreaseQty = (item) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const removeItem = (item) => {
    setCart((prev) => prev.filter((i) => i.id !== item.id));
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setSort("");
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div>
      <h2>Products</h2>

      <Filters
        search={search}
        category={category}
        sort={sort}
        categories={categories}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onSortChange={setSort}
        onClearFilters={clearFilters}
      />

      <ProductList products={filteredProducts} onAddToCart={addToCart} />

      <Cart
        cartItems={cart}
        onIncrease={increaseQty}
        onDecrease={decreaseQty}
        onRemove={removeItem}
      />
    </div>
  );
}

export default Home;
