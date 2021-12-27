import { Grid } from "@mui/material";
import React from "react";
import AuthForm from "./components/AuthForm/AuthForm";
import Footer from "../../common/components/Footer";

export default function AuthPage() {
  return (
    <div style={{ position: "relative" }}>
      <Grid
        container
        sx={{ minHeight: "100vh", backgroundColor: "white" }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <AuthForm />
        </Grid>
        <div
          style={{
            position: "absolute",
            bottom: "0px",
            width: "100%",
           
          }}
        >
          <Footer />
        </div>
      </Grid>
    </div>
  );
}
