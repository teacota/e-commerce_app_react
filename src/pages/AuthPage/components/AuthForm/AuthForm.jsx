import React from "react";
import {
  Card,
  CardContent,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import styles from "./AuthForm.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { schema } from "../../../../helpers/validation";
import { useDispatch, useSelector } from "react-redux";
import {
  register,
  login,
  resetError,
  resetSuccess,
} from "../../../../state/authenticationSlice";
import Notification from "../../../../common/components/Notification/Notification";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function AuthForm() {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [isLogin, setIsLogin] = React.useState(false);
  const [error, setError] = React.useState({
    passwordError: false,
    confirmPasswordError: false,
  });

  const history = useHistory();

  const [notification, setNotification] = React.useState({
    open: false,
    description: "Registered successfully",
  });

  const handleClose = () => {
    setNotification((prevState) => ({
      ...prevState,
      open: false,
      severity: "success",
    }));
  };

  const {
    isLoading,
    error: authError,
    success,
    user,
  } = useSelector((state) => state.authentication);

  if (user) {
    history.push("/home");
  }

  React.useEffect(() => {
    if (authError) {
      setNotification((prevState) => ({
        ...prevState,
        open: true,
        description: isLogin ? "Login Failed" : "Registration failed",
        severity: "error",
      }));
      dispatch(resetError());
    }
  }, [authError]);

  React.useEffect(() => {
    if (success) {
      setNotification((prevState) => ({
        ...prevState,
        open: true,
        description: !isLogin
          ? "Registration was successful"
          : prevState.description,
      }));
      dispatch(resetSuccess());
    }
  }, [success]);

  React.useEffect(() => {
    if (user) {
      history.push("/home");
    }
  }, [user]);

  const dispatch = useDispatch();

  const usernameRef = React.useRef(null),
    emailRef = React.useRef(null),
    passwordRef = React.useRef(null),
    confirmPasswordRef = React.useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputs = {};
    if (!isLogin) {
      inputs.password = passwordRef.current.value;
      inputs.confirmPassword = confirmPasswordRef.current.value;
    }

    if (isLogin) {
      dispatch(
        login({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
      );
      return;
    }

    try {
      const value = await schema.validateAsync(inputs);
      setError({
        passwordError: false,
        confirmPasswordError: false,
      });
      dispatch(
        register({
          username: usernameRef.current.value,
          email: emailRef.current.value,
          password1: passwordRef.current.value,
          password2: confirmPasswordRef.current.value,
        })
      );
    } catch (err) {
      err = err.toString();
      if (err.includes("confirmPassword"))
        setError({ ...error, confirmPasswordError: "Passwords should match" });
      else
        setError({
          ...error,
          passwordError: "Password should be at least 8 characters long",
        });
    }
  };

  return (
    <>
      <Card
        sx={{ height: "50%", width: isSmallScreen ? "100%" : "40%" }}
        elevation={6}
      >
        <CardContent>
          <form className={styles["container"]} onSubmit={handleSubmit}>
            <div className={styles["container__header"]}>
              <AccountCircleIcon fontSize="large" />
              <Typography
                variant="h6"
                sx={{
                  color: "black",
                  fontFamily: "Pushster",
                  fontWeight: "bold",
                }}
              >
                {isLogin ? "Login" : "Register"}
              </Typography>
            </div>
            {!isLogin && (
              <TextField
                label="Username"
                type="text"
                inputRef={usernameRef}
                fullWidth
              />
            )}
            <TextField
              label="Email"
              type="email"
              placeholder="email@email.com"
              required
              inputRef={emailRef}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              inputRef={passwordRef}
              error={error.passwordError}
              helperText={error.passwordError}
              fullWidth
            />
            {!isLogin && (
              <TextField
                label="Confirm password"
                type="password"
                inputRef={confirmPasswordRef}
                error={error.confirmPasswordError}
                helperText={error.confirmPasswordError}
                fullWidth
              />
            )}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                backgroundColor: "#2E2E2E",

                color: "white",
                cursor: "pointer",
                ":hover": { backgroundColor: "#808080", color: "white" },
              }}
              disabled={isLoading}
            >
              {isLogin ? "Login" : "Register"}
            </Button>
            <Typography
              onClick={() => setIsLogin(!isLogin)}
              color="primary"
              sx={{
                cursor: "pointer",
                ":hover": { textDecoration: "underline" },
                color: "black",
              }}
            >
              {isLogin
                ? "Don't have an account? Click here to register"
                : "Already have an account? Click here to login"}
            </Typography>
          </form>
        </CardContent>
      </Card>
      {notification.open && (
        <Notification {...notification} handleClose={handleClose} />
      )}
    </>
  );
}
