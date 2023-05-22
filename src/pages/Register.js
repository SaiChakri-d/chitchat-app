import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.png";
const theme = createTheme();

export default function Register() {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = React.useState(true);
  const [values, setValues] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  React.useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleShowPassword = () => {
    setShowPwd(!showPwd);
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            width: "400px",
            borderRadius: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "-60px",
            }}
          >
            <img
              style={{
                height: "8rem",
                margin: "2rem"
              }}
              src={logo}
              alt="logo"
            />
            <h1>ChitChat</h1>
          </div>
          <Box
            component="form"
            noValidate
            onSubmit={(event) => handleSubmit(event)}
            sx={{
              mt: 1,
              padding: "15px",
              fontFamily: "DM Sans",
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: "16px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="UserName"
                  autoFocus
                  onChange={(e) => handleChange(e)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                 
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                  type={!showPwd ? "text" : "password"}
                  autoComplete="new-password"
                  onChange={(e) => handleChange(e)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                          {showPwd === false ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm-Password"
                  type={!showPwd ? "text" : "password"}
                  id="confirmPassword"
                  autoComplete="confirmPassword"
                  onChange={(e) => handleChange(e)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                          {showPwd === false ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
            //   variant="contained"
              
              required
              sx={{
                mt: 2,
                mb: 2,
                "&:hover": {
                  backgroundColor: "#4b0dba",
                },
                backgroundColor: "#4b0dba",
                color: "#fff",
                fontFamily: "DM Sans",
                fontSize: "20px",
                textTransform: "inherit",
                fontWeight: 100,
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              
              <Grid
                container
                style={{
                  marginLeft: "70px",
                }}
              >
                <Grid item>
                  {" "}
                  Already have an account?
                  <Link
                    style={{
                      color: "#4e0eff",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                    href="/login"
                  >
                    {" Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <ToastContainer />
    </ThemeProvider>
  );
}
