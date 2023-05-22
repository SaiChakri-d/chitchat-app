
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
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment,  } from "@mui/material";
import logo from "../assets/logo.png";


const theme = createTheme();

export default function Login() {
  let navigate = useNavigate();
  const [showPwd, setShowPwd] = React.useState(true);
  const [values, setValues] = React.useState({ email: "", password: "" });
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

  const validateForm = () => {
    const { email, password } = values;
    if (email === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };
  const handleShowPassword = () => {
    setShowPwd(!showPwd);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { email, password } = values;
      const { data } = await axios.post(loginRoute, {
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
            marginTop: 8,
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
            onSubmit={(event) => handleSubmit(event)}
            noValidate
            sx={{
              mt: 1,
              padding: "15px",
              fontFamily: "DM Sans",
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: "16px",
            }}
          >
            <TextField
              required
              fullWidth
              onChange={(e) => handleChange(e)}
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              onChange={(e) => handleChange(e)}
              name="password"
              label="Password"
              type={!showPwd ? "text" : "password"}
              id="password"
              autoComplete="current-password"
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
            {/* <Link
              style={{
                color: "#4e0eff",
                textDecoration: "none",
                fontWeight: "bold",
              }}
              href="/password"
              variant="body2"
            >
              Forgot password?
            </Link> */}
            <Button
              type="submit"
              fullWidth
              margin="normal"
              required
              sx={{
                mt: 1,
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
              Sign In
            </Button>
            <Grid
              container
              style={{
                marginLeft: "80px",
              }}
            >
              <Grid item>
                {" "}
                Don't have an account?
                <Link
                  style={{
                    color: "#4e0ef",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                  href="/register"
                >
                  {" Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

      <ToastContainer />
    </ThemeProvider>
  );
}
