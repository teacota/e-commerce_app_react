import React from "react";
import { Button, TextField, Box, Card, CardContent } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Footer from "../../../common/components/Footer";
export default function PaymentForm() {
  const [cardType, setCardType] = React.useState("");

  const handleChange = (event) => {
    setCardType(event.target.value);
  };

  return (
    <>
      <div>
        <Card
          display="flex"
          justifyContent="center"
          alignItems="center"
          elevation={4}
          sx={{
            width: "650px",
            height: "600px",
            margin: "auto",
            marginTop: "20px",
            marginBottom: "15px",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "space-between",
              }}
            >
              <TextField
                sx={{ padding: "10px", width: "350px" }}
                type="text"
                label="Fullname"
                variant="outlined"
                required
              />

              <TextField
                sx={{ padding: "10px", width: "350px" }}
                type="email"
                label="E-mail"
                variant="outlined"
                required
              />

              <TextField
                sx={{ padding: "10px", width: "350px" }}
                type="text"
                label="Address"
                variant="outlined"
                required
              />

              <TextField
                sx={{ padding: "10px", width: "350px" }}
                type="number"
                label="Postal Code"
                variant="outlined"
              />
              <TextField
                sx={{ padding: "10px", width: "350px" }}
                type="number"
                label="Phone"
                variant="outlined"
                required
              />
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    CardType
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={cardType}
                    onChange={handleChange}
                    sx={{ marginLeft: "10px", width: "350px", height: "56px" }}
                  >
                    <MenuItem value={10}>MasterCard</MenuItem>
                    <MenuItem value={20}>Visa</MenuItem>
                    <MenuItem value={30}>DebitCard</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <TextField
                sx={{ padding: "10px", width: "350px" }}
                type="number"
                label="CardNumber"
                variant="outlined"
                required
              />
              <div style={{ width: "100%", textAlign: "center" }}>
                <Button
                  variant="outlined"
                  type="submit"
                  sx={{
                    fontWeight: "bold",
                    border: "1px solid black",
                    color: "white",
                    backgroundColor: "black",
                    width: "150px",
                    cursor: "pointer",
                    ":hover": {
                      color: "black",
                      backgroundColor: "#AFE1AF",
                      border: "1px solid #AFE1AF",
                    },
                    marginTop: "20px",
                  }}
                >
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
