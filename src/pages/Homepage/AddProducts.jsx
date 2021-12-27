import React, { useRef } from "react";
import styles from "./AdminPanel.module.scss";
import { useHistory } from "react-router-dom";
import { Button, TextField, Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import axios from "axios";

export const CATEGORIES = ["Men", "Kids", "Women", "Accessories"];

export default function AddProducts() {
  const history = useHistory();

  const [category, setCategory] = React.useState("");
  const [image, setImage] = React.useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const nameRef = useRef(null),
    priceRef = useRef(null),
    descriptionRef = useRef(null),
    stockRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", nameRef.current.value);
    formData.append("price", priceRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("stock", stockRef.current.value);
    formData.append("category", category);

    try {
      const result = await axios({
        method: "post",
        url: process.env.REACT_APP_API + `products/`,
        data: formData,
        headers: {
          Authorization:
            "Bearer " + localStorage.getItem("token").split('"')[1],
        },
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["container__drawer"]}>
        <p
          className={styles["menu-categories"]}
          onClick={() => {
            history.push("/home");
          }}
        >
          USERS
        </p>
        <p
          className={styles["menu-categories"]}
          onClick={() => {
            history.push("/add-product");
          }}
        >
          ADD PRODUCTS
        </p>
      </div>
      <div className={styles["form-container"]}>
        <form className={styles["product-form"]} onSubmit={handleSubmit}>
          <Box sx={{ minWidth: 120 }} p={1}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={handleChange}
              >
                {CATEGORIES.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box p={1}>
            <TextField
              type="text"
              label="Product Name"
              variant="outlined"
              inputRef={nameRef}
            />
          </Box>
          <Box p={1}>
            <TextField
              type="number"
              label="Product Price "
              variant="outlined"
              inputRef={priceRef}
            />
          </Box>
          <Box p={1}>
            <textarea
              style={{ height: "120px", width: "220px", resize: "none" }}
              ref={descriptionRef}
              placeholder="Description"
            />
          </Box>
          <Box p={1}>
            <TextField
              type="number"
              label="Product Stock"
              variant="outlined"
              inputRef={stockRef}
            />
          </Box>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box p={1}>
              <Button
                variant="contained"
                component="label"
                sx={{
                  backgroundColor: "#171717",
                  width: "150px",
                  cursor: "pointer",
                  ":hover": {
                    color: "white",
                    backgroundColor: "#737373",
                    border: "1px solid  #737373",
                  },
                }}
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
              {image && (
                <div className={styles["file-notification"]}>
                  <div style={{ marginRight: "15px" }}> {image.name}</div>
                  <div>
                    <RemoveCircleIcon
                      onClick={() => setImage(null)}
                      style={{ marginTop: "8px" }}
                    />
                  </div>
                </div>
              )}
            </Box>
            <Box p={1}>
              <Button
                variant="outlined"
                type="submit"
                sx={{
                  fontWeight: "bold",
                  border: "1px solid black",
                  color: "black",
                  width: "150px",
                  cursor: "pointer",
                  ":hover": {
                    color: "black",
                    backgroundColor: "#AFE1AF",
                    border: "1px solid #AFE1AF",
                  },
                }}
              >
                Submit
              </Button>
            </Box>
          </div>
        </form>
      </div>
    </div>
  );
}
