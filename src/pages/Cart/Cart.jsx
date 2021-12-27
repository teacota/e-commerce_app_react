import React from "react";
import styles from "../PublicHome/PublicHome.module.scss";
import { useSelector, useDispatch } from "react-redux";
import Product from "../PublicHome/components/Product";
import { removeFromCart } from "../../state/productsSlice";
import DialogBox from "../../common/components/Notification/DialogBox";
import Footer from "../../common/components/Footer";

export default function Cart() {
  const { cart } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const handleRemove = (item) => {
    dispatch(removeFromCart({ id: item.id }));
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={{ postition: "absolute" }}>
        <DialogBox />
      </div>
      <div className={styles["container__products"]}>
        {cart.map((item) => (
          <Product
            {...item}
            key={item.id}
            handleAddToCart={() => handleRemove(item)}
          />
        ))}
      </div>
      <div
        style={{
          width: "100%",
          position: "absolute",
          bottom: "0px",
          height: "8px",
        }}
      >
        <Footer />
      </div>
    </div>
  );
}
