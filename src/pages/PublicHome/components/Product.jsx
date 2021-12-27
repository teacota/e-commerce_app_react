import React from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { useHistory } from "react-router-dom";

export default function Product({
  image,
  description,
  price,
  name,
  category,
  handleAddToCart,
  stock,
}) {
  const history = useHistory();
  const {
    location: { pathname },
  } = history;
  return (
    <>
      <Card
        sx={{ width: "400px", margin: "1rem", height: "550px" }}
        elevation={5}
      >
        <CardContent>
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <img
                src={image}
                width={220}
                height={300}
                style={{
                  filter:
                    pathname === "/Card" && stock === 0
                      ? "grayscale(1)"
                      : "grayscale(0)",
                }}
              />
            </Grid>
            <div
              className="container"
              style={{
                height: "220px",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  marginLeft: "15px",
                }}
              >
                <Grid
                  item
                  xs={6}
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Pushster",
                    fontSize: "16px",
                  }}
                >
                  {name}
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "Pushster",
                      textAlign: "right",
                      marginRight: "60px",
                    }}
                  >
                    {"$" + price}
                  </Typography>
                </Grid>
              </div>
              <div
                style={{
                  width: "100%",
                  marginTop: "5px",
                }}
              >
                <Grid
                  item
                  xs={12}
                  sx={{ fontFamily: "Pushster", marginTop: "8px" }}
                >
                  {description}
                </Grid>
              </div>
              <div
                style={{
                  width: "100%",
                  marginTop: "6px",
                  textAlign: "right",
                  position: "absolute",
                  bottom: "65px",
                }}
              >
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontFamily: "Pushster",
                      paddingRight: "35px",
                    }}
                  >
                    {category}
                  </Typography>
                </Grid>
              </div>
              <div
                style={{
                  width: "100%",
                  position: "absolute",
                  bottom: "5px",
                }}
              >
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Button
                    variant="outlined"
                    onClick={handleAddToCart}
                    disabled={pathname === "/Card" && stock === 0}
                    sx={{
                      borderRadius: "15%",
                      backgroundColor: "#2E2E2E",
                      color: "white",
                      width: "160px",
                      cursor: "pointer",
                      ":hover": {
                        color: "white",
                        backgroundColor: "#737373",
                        border: "1px solid #737373",
                      },
                    }}
                  >
                    {pathname === "/Card" ? "Remove Item" : "Add To Cart +"}
                  </Button>
                </Grid>
              </div>
            </div>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
