function Cart({ cartItems, onIncrease, onDecrease, onRemove }) {
  if (cartItems.length === 0) {
    return <p>Your cart is empty</p>;
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <div style={cartStyle}>
      <h3>Cart</h3>

      {cartItems.map((item) => (
        <div key={item.id} style={itemStyle}>
          <span>{item.title}</span>

          <div>
            <button onClick={() => onDecrease(item)}>-</button>
            <span style={{ margin: "0 8px" }}>{item.quantity}</span>
            <button
              onClick={() => onIncrease(item)}
              disabled={item.quantity >= item.stock}
            >
              +
            </button>
          </div>

          <button onClick={() => onRemove(item)}>Remove</button>
        </div>
      ))}

      <hr />
      <p><strong>Total Items:</strong> {totalItems}</p>
      <p><strong>Total Price:</strong> ₹{totalPrice}</p>
    </div>
  );
}

const cartStyle = {
  border: "1px solid #ccc",
  padding: "12px",
  marginTop: "20px"
};

const itemStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "8px"
};

export default Cart;

