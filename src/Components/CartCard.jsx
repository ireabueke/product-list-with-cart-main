import React from "react";

function CartCard({ productImg, price, productName, productDescription }) {
  const desktop = productImg[0];
  const tablet = productImg[1];
  const mobile = productImg[2];
  console.log(mobile);

  return (
    <div>
      <div>
        <picture>
          {/* Desktop */}
          <source
            media="(min-width: 1024px)"
            srcSet={`/assets/images/${desktop}`}
          />
          {/* Tablet */}
          <source
            media="(min-width: 768px)"
            srcSet={`/assets/images/${tablet}`}
          />
          {/* Mobile (Default) */}
          <img
            src={`./assets/images/${mobile}`}
            alt="Responsive display"
            style={{ width: "200px", height: "200px" }}
          />
        </picture>
        {/* <img src="/assets/images/image-meringue-desktop.jpg" alt="" /> */}
        <p>Add to Cart</p>
      </div>
      <div>
        <p>waffle</p>
        <p>waffle with berries</p>
        <p>$6.50</p>
      </div>
    </div>
  );
}

export default CartCard;
