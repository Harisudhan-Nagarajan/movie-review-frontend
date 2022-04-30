// import { Button } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import { moviescontext } from "./App";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
export function Home() {
  const [movielists, Setmovie] = useContext(moviescontext);

  return (
    <div id="movielist">
      {movielists.map(({ name, url, rating, summary, _id }, index) => (
        <Display
          key={_id}
          id={_id}
          name={name}
          url={url}
          rating={rating}
          summary={summary}
          index={index}
        />
      ))}
    </div>
  );
}

function Display({ name, url, rating, summary, id }) {
  const navigate = useNavigate();
  var styles = {
    color: rating >= 8.5 ? "green" : "yellow",
  };

  const [show, setShow] = useState(true);
  let summarystyle = { display: show ? "none" : "block", color: "azure" };

  return (
    <Card sx={{ maxWidth: 300, height: "auto" }} id="card">
      <CardMedia component="img" height="340" image={url} alt={name} />
      <CardContent>
        <Typography gutterBottom component="div">
          <h2>{name}</h2>
          <p>
            IMDB : <span style={styles}>{rating}</span> ⭐
          </p>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <IconButton sx={{ color: "blue" }} onClick={() => setShow(!show)}>
            {show ? <ExpandMoreIcon /> : <KeyboardArrowUpIcon />}
          </IconButton>
          <IconButton
            aria-label="delete"
            size="large"
            color="success"
            onClick={() => navigate(`/about/${id}`)}
          >
            <InfoIcon />
          </IconButton>
          <span style={summarystyle}>{summary}</span>
        </Typography>
      </CardContent>
    </Card>
  );
}
