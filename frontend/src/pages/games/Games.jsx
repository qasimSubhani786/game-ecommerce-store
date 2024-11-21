import React, { useEffect } from "react";
import { Card } from "../../components";
import { getAllGames } from "../../utils/rest-services";
import { useState } from "react";
import { CircularProgress, Grid } from "@mui/material";
const Games = () => {
  const [allGames, setAllGames] = useState([]);
  const [getGames, setGetGames] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const allGamesData = await getAllGames();
      setAllGames(allGamesData.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container spacing={2}>
      {allGames.map((game, index) => (
        <Grid item sm={12} md={4}>
          <Card
            addtocart={true}
            item={game}
            setValue={setAllGames}
            number={index}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Games;
