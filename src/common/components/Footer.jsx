import React from "react";

export default function Footer() {
  const footerStyle = {
    width: "100%",
    height: "70px",
    backgroundColor: "black",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Pushster",
  };
  return (
    <>
      <div style={footerStyle}>
        <p>Copyright ReactJs Team © KODO 2021 All Rights Reserved.</p>
      </div>
    </>
  );
}
