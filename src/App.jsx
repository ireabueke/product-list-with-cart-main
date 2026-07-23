import React, { useState, useEffect } from "react";
import productsData from "./data.json";
import styles from "./App.module.css";

export default function App() {
  // Read initial cart state directly from LocalStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("desserts_cart");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync state changes with LocalStorage
  useEffect(() => {
    localStorage.setItem("desserts_cart", JSON.stringify(cart));
  }, [cart]);

  // Cart operations
  const updateQuantity = (productId, delta) => {
    setCart((prev) => {
      const currentQty = prev[productId] || 0;
      const updatedQty = currentQty + delta;

      const newCart = { ...prev };
      if (updatedQty <= 0) {
        delete newCart[productId];
      } else {
        newCart[productId] = updatedQty;
      }
      return newCart;
    });
  };

  const removeItem = (productId) => {
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[productId];
      return newCart;
    });
  };

  const resetOrder = () => {
    setCart({});
    setIsModalOpen(false);
  };

  // Calculations
  const cartEntries = Object.entries(cart);
  const totalItemCount = cartEntries.reduce((sum, [, qty]) => sum + qty, 0);
  const cartTotal = cartEntries.reduce((sum, [id, qty]) => {
    const product = productsData.find((p) => p.id === id);
    return sum + (product ? product.price * qty : 0);
  }, 0);

  return (
    <div className={styles.container}>
      {/* Desserts Grid Section */}
      <main>
        <h1 className={styles.heading}>Desserts</h1>
        <div className={styles.productGrid}>
          {productsData.map((product) => {
            const quantity = cart[product.id] || 0;
            const isSelected = quantity > 0;

            return (
              <div key={product.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <picture>
                    {/* Desktop */}
                    <source
                      media="(min-width: 1024px)"
                      srcSet={`/assets/images/${product.image[0]}`}
                    />
                    {/* Tablet */}
                    <source
                      media="(min-width: 768px)"
                      srcSet={`/assets/images/${product.image[1]}`}
                    />
                    {/* Mobile (Default) */}
                    <img
                      src={`/assets/images/${product.image[2]}`}
                      alt="Responsive display"
                      className={`${styles.productImage} ${isSelected ? styles.selectedImage : ""}`}
                      // style={{ width: "200px", height: "200px" }}
                    />
                  </picture>
                  {/* <img
                    src={product.image}
                    alt={product.name}
                    className={`${styles.productImage} ${isSelected ? styles.selectedImage : ""}`}
                  /> */}
                  <div className={styles.buttonContainer}>
                    {!isSelected ? (
                      <button
                        className={styles.addToCartBtn}
                        onClick={() => updateQuantity(product.id, 1)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="21"
                          height="20"
                          fill="none"
                          viewBox="0 0 21 20"
                        >
                          <g fill="#C73B0F">
                            <path d="M6.5 7.5a2.5 2.5 0 0 1 5 0v2.5h-5V7.5z" />
                            <path
                              fillRule="evenodd"
                              d="M1.5 5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2V5zm2-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-11z"
                              clipRule="evenodd"
                            />
                          </g>
                        </svg>
                        <span>Add to Cart</span>
                      </button>
                    ) : (
                      <div className={styles.quantitySelector}>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateQuantity(product.id, -1)}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span>{quantity}</span>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateQuantity(product.id, 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <span className={styles.category}>{product.category}</span>
                <h3 className={styles.productName}>{product.name}</h3>
                <span className={styles.price}>
                  ${product.price.toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>
      </main>

      {/* Cart Summary Panel */}
      <aside className={styles.cartPanel}>
        <h2 className={styles.cartTitle}>Your Cart ({totalItemCount})</h2>

        {totalItemCount === 0 ? (
          <div className={styles.emptyCart}>
            <svg
              width="128"
              height="128"
              viewBox="0 0 128 128"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M96 72c0 13.255-14.327 24-32 24S32 85.255 32 72s14.327-24 32-24 32 10.745 32 24z"
                fill="#F5EEEC"
              />
              <path
                d="M96 68c0 13.255-14.327 24-32 24S32 81.255 32 68v4c0 13.255 14.327 24 32 24s32-10.745 32-24v-4z"
                fill="#E2D4D1"
              />
              <path d="M84 48l12 16H32l12-16h40z" fill="#C7A39A" />
              <path
                d="M84 44c0 4.418-8.954 8-20 8s-20-3.582-20-8 8.954-8 20-8 20 3.582 20 8z"
                fill="#AB7A6E"
              />
            </svg>
            <p className={styles.emptyCartText}>
              Your added items will appear here
            </p>
          </div>
        ) : (
          <div>
            <div className={styles.cartList}>
              {cartEntries.map(([id, qty]) => {
                const product = productsData.find((p) => p.id === id);
                if (!product) return null;
                const itemTotal = product.price * qty;

                return (
                  <div key={id} className={styles.cartItem}>
                    <div className={styles.itemDetails}>
                      <h4>{product.name}</h4>
                      <div className={styles.itemStats}>
                        <span className={styles.itemQty}>{qty}x</span>
                        <span className={styles.itemUnitPrice}>
                          @ ${product.price.toFixed(2)}
                        </span>
                        <span className={styles.itemTotalPrice}>
                          ${itemTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button
                      className={styles.removeBtn}
                      onClick={() => removeItem(id)}
                      aria-label="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>

            <div className={styles.cartTotalContainer}>
              <span className={styles.cartTotalText}>Order Total</span>
              <span className={styles.cartTotalSum}>
                ${cartTotal.toFixed(2)}
              </span>
            </div>

            <div className={styles.carbonNeutral}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                fill="none"
                viewBox="0 0 21 20"
              >
                <path
                  fill="#1EA775"
                  d="M7 10a2.5 2.5 0 0 1 2.5-2.5h2A2.5 2.5 0 0 1 14 10v4a2.5 2.5 0 0 1-2.5 2.5h-2A2.5 2.5 0 0 1 7 14v-4zm2.5-1a1.5 1.5 0 0 0-1.5 1.5v4a1.5 1.5 0 0 0 1.5 1.5h2a1.5 1.5 0 0 0 1.5-1.5v-4a1.5 1.5 0 0 0-1.5-1.5h-2z"
                />
                <path
                  fill="#1EA775"
                  d="M10.5 2a6.5 6.5 0 0 0-6.4 5.378A4.502 4.502 0 0 0 1 11.5 4.5 4.5 0 0 0 5.5 16h.5v-1h-.5A3.5 3.5 0 0 1 2 11.5a3.5 3.5 0 0 1 3.018-3.462l.813-.116.143-.81A5.5 5.5 0 0 1 11.332 3.03l.83.176-.192.82A4.502 4.502 0 0 1 16 8.5V9h.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5H16v1h.5a4.5 4.5 0 0 0 4.5-4.5 4.5 4.5 0 0 0-3.328-4.34A5.502 5.5 0 0 0 10.5 2z"
                />
              </svg>
              <span>
                This is a <strong>carbon-neutral</strong> delivery
              </span>
            </div>

            <button
              className={styles.confirmBtn}
              onClick={() => setIsModalOpen(true)}
            >
              Confirm Order
            </button>
          </div>
        )}
      </aside>

      {/* Order Confirmation Modal */}
      {isModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <svg
              className={styles.modalIcon}
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="24" cy="24" r="23" stroke="#0E8A5F" strokeWidth="2" />
              <path
                d="M15 24L21 30L33 18"
                stroke="#0E8A5F"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <h2 className={styles.modalTitle}>Order Confirmed</h2>
            <p className={styles.modalSubtext}>We hope you enjoy your food!</p>

            <div className={styles.modalSummary}>
              {cartEntries.map(([id, qty]) => {
                const product = productsData.find((p) => p.id === id);
                if (!product) return null;
                return (
                  <div key={id} className={styles.modalItem}>
                    <div className={styles.modalItemLeft}>
                      {console.log(product.image[3])}
                      <img
                        src={`assets/images/${product.image[3]}`}
                        alt={product.name}
                        className={styles.modalThumb}
                      />
                      <div>
                        <h4 style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                          {product.name}
                        </h4>
                        <div
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                            fontSize: "0.85rem",
                            marginTop: "0.2rem",
                          }}
                        >
                          <span className={styles.itemQty}>{qty}x</span>
                          <span className={styles.itemUnitPrice}>
                            @ ${product.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span style={{ fontWeight: 600 }}>
                      ${(product.price * qty).toFixed(2)}
                    </span>
                  </div>
                );
              })}

              <div
                className={styles.cartTotalContainer}
                style={{ paddingBottom: 0 }}
              >
                <span className={styles.cartTotalText}>Order Total</span>
                <span className={styles.cartTotalSum}>
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button className={styles.newOrderBtn} onClick={resetOrder}>
              Start New Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
