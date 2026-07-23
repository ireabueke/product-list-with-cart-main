import CartCard from "../Components/CartCard";
import { productData } from "../data/productsData";

export const Home = () => {
  return (
    <div>
      {productData.map((data, index) => (
        <CartCard
          key={index}
          productImg={data.image}
          price={data.price}
          productName={data.dessert}
          productDescription={data.dessertDescription}
        />
      ))}
    </div>
  );
};
