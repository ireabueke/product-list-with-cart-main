import React from "react";
import image from "../assets/images/image-baklava-tablet.jpg";

function CartCard() {
  return (
    <div>
      <picture>
        {/* Desktop Image (Screens 1024px and wider) */}
        <source media="(min-width: 1024px)" src={image} />
        {/* Mobile Image (Screens under 1024px) */}
        <source media="(max-width: 1023px)" src={image} />
        {/* Fallback Image for unsupported browsers */}
        {/* <img src={image} alt="Product Name" /> */}
      </picture>
      {/* <img src={image} alt="Product Name" /> */}
    </div>
  );
}

export default CartCard;
