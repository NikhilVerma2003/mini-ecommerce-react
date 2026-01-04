function ProductCard({ product, onAddToCart }) {
  const isOutOfStock = product.stock === 0;

  return (
    <div style={cardStyle}>
      <h4>{product.title}</h4>

      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Price:</strong> ₹{product.price}</p>

      <p style={{ color: isOutOfStock ? "red" : "green" }}>
        {isOutOfStock ? "Out of Stock" : "In Stock"}
      </p>

      <button
        onClick={() => onAddToCart(product)}
        disabled={isOutOfStock}
      >
        Add to Cart
      </button>
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ccc",
  padding: "12px",
  borderRadius: "6px",
};

export default ProductCard;
