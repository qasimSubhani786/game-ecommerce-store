import React from "react";
import { useEffect } from "react";
import { getFavourite } from "../../utils/rest-services";
import { useState } from "react";
import { Card } from "../../components";
import { CircularProgress, Grid } from "@mui/material";
const Favorites = () => {
  const [myFavorites, setMyFavorites] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const allFavouritesData = await getFavourite();
      console.log(allFavouritesData, "allFavouritesData");
      setMyFavorites(allFavouritesData.data.allGames);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(myFavorites, "myFavorites");
  return myFavorites?.length !== 0 ? (
    <Grid container spacing={2}>
      {myFavorites.map((game, index) => (
        <Grid item sm={12} md={4}>
          <Card
            addtocart={true}
            item={game}
            setValue={setMyFavorites}
            number={index}
            favourite={true}
          />
        </Grid>
      ))}
    </Grid>
  ) : (
    <div style={{ alignItems: "center", padding: "20px" }}>
      <CircularProgress />
    </div>
  );
};

export default Favorites;
