import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { moviescontext } from "./App";
export function About() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [moviedetial, Setmoviedetial] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rating, setrating] = useState();
  const [userrating, setuserrating] = useState();
  const [movielists, Setmovie] = useContext(moviescontext);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  useEffect(() => {
    movielists
      .filter((item) => item._id === id)
      .map((item) => Setmoviedetial(item));
  }, [movielists]);
  const deleterating = () => {
    handleClose();
    fetch(`https://hari-movie-review.herokuapp.com/movies/movies/${id}`, {
      method: "delete",
      headers: {
        "content-Type": "application/json",
        token: localStorage.getItem("token"),
        email: localStorage.getItem("email"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setuserrating();
      });
  };
  const postrating = () => {
    handleClose();
    if (localStorage.getItem("token") && localStorage.getItem("email")) {
      fetch(`https://hari-movie-review.herokuapp.com/movies/rating/${id}`, {
        method: "POST",
        body: JSON.stringify({ rating: rating }),
        headers: {
          "content-Type": "application/json",
          token: localStorage.getItem("token"),
          email: localStorage.getItem("email"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setuserrating(+data.rating);
        });
    } else {
      navigate("/login");
    }
  };
  const getrating = () => {
    fetch(`https://hari-movie-review.herokuapp.com/movies/movies/${id}`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        token: localStorage.getItem("token"),
        email: localStorage.getItem("email"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.rating) {
          console.log(data.rating);
          setuserrating(data.rating);
        }
      });
  };
  useEffect(getrating, []);
  return (
    <div>
      {moviedetial ? (
        <div id="movierating">
          <div>
            <h1>{moviedetial.name}</h1>
            <p>
              IMDB : <span>{moviedetial.rating}</span> ⭐
            </p>
            <Button onClick={handleOpen}>Rate {userrating}⭐</Button>

            {/* <Button variant="outlined" startIcon={<ArrowBackIosIcon />}>
              Back
            </Button> */}
          </div>
          <div id="trailer">
            <img
              src={moviedetial.url}
              alt={moviedetial.name}
              id="trailerimg"
              style={{ width: "400px", height: "406px" }}
            />
            <iframe
              width="800"
              height="406"
              src={`https://www.youtube.com/embed/${moviedetial.trailer}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <p>{moviedetial.summary}</p>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <StarIcon />
              {moviedetial.name}
              <Rating
                name="customized-10"
                defaultValue={userrating ? userrating : 0}
                onChange={(value) => setrating(value.target.value)}
                max={10}
              />

              <Button onClick={() => postrating()}>Rate</Button>
              <Button onClick={() => deleterating()}>Remove Rating</Button>
            </Box>
          </Modal>
        </div>
      ) : (
        " "
      )}
    </div>
  );
}
