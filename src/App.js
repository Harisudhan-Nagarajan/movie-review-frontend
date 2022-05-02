import * as React from "react";
import "./App.css";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./Home";
import { useState, useEffect, useContext, createContext } from "react";
import { About } from "./About";
import { Login } from "./Login";
import { Signup } from "./Signup";

export const moviescontext = createContext();
function App() {
  const navigate = useNavigate();
  const [movielists, Setmovie] = useState([]);
  useEffect(() => {
    fetch("https://hari-movie-review.herokuapp.com/movies/movies")
      .then((res) => res.json())
      .then((data) => Setmovie(data));
  }, []);

  return (
    <div className="App">
      <moviescontext.Provider value={[movielists, Setmovie]}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" sx={{ backgroundColor: "black" }}>
            <Toolbar>
              <Button
                color="inherit"
                onClick={() => navigate("/")}
                sx={{ marginLeft: "auto" }}
              >
                Home
              </Button>
              {localStorage.getItem("token") ? (
                <Button
                  color="inherit"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                  }}
                >
                  Log out
                </Button>
              ) : (
                <Button color="inherit" onClick={() => navigate("/login")}>
                  Log in
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </Box>
        <div id="routes">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about/:id" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </moviescontext.Provider>
    </div>
  );
}
export default App;
