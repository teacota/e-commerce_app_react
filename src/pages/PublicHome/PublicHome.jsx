import React from "react";
import { CATEGORIES } from "../Homepage/AddProducts";
import styles from "./PublicHome.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../state/productsSlice";
import Product from "./components/Product";
import Pagination from "@mui/material/Pagination";
import { addToCart } from "../../state/productsSlice";
import Footer from "../../common/components/Footer";
import Notification from "../../common/components/Notification/Notification";
import { useHistory } from "react-router-dom";

const categories = ["All", ...CATEGORIES];

export default function PublicHome() {
  const dispatch = useDispatch();
  const { products, isLoading, count } = useSelector((state) => state.products);
  const [activeCategory, setActiveCategory] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [notification, setNotification] = React.useState({
    open: false,
    description: "Added Successfully To Cart",
  });
  const history = useHistory();

  React.useEffect(() => {
    dispatch(getProducts({ category: activeCategory, offset: 0 }));
  }, []);

  React.useEffect(() => {
    dispatch(getProducts({ category: activeCategory, offset: 0 }));
  }, [activeCategory]);

  const handlePageChange = (event, value) => {
    setPage(value - 1);
  };

  React.useEffect(() => {
    dispatch(getProducts({ category: activeCategory, offset: 4 * page }));
  }, [page]);

  const handleAddToCart = (item) => {
    dispatch(addToCart({ item }));
    setNotification((prevState) => ({
      ...prevState,
      open: true,
      severity: "success",
    }));
  };

  const handleClose = () => {
    setNotification((prevState) => ({
      ...prevState,
      open: false,
      severity: "success",
    }));
  };
  return (
    <div className={styles["container"]}>
      <div className={styles["container__categories"]}>
        {categories.map((category) => (
          <p
            onClick={() => {
              setPage(0);
              if (category === "All") category = "";
              setActiveCategory(category);
            }}
          >
            {category}
          </p>
        ))}
      </div>
      <div className={styles["container__products"]}>
        {products.map((product) => (
          <Product
            {...product}
            key={product.id}
            handleAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "15px",
          height: "50px",
          position: "relative",
          marginRight: "50px",
        }}
      >
        <Pagination
          count={Math.ceil(count / 4)}
          page={page + 1}
          onChange={handlePageChange}
          size="large"
          sx={{ position: "absolute", bottom: "0px" }}
        />
      </div>
      {notification.open && (
        <Notification {...notification} handleClose={handleClose} />
      )}
      <Footer />
    </div>
  );
}
