import React from "react";
import { useEffect } from "react";
import { getAllGears } from "../../utils/rest-services";
import { useState } from "react";
import { Card } from "../../components";
import { CircularProgress, Grid } from "@mui/material";
const Gears = () => {
  const [allGears, setAllGears] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gearsData = await getAllGears();
        setAllGears(gearsData.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  console.log(allGears, "allGears");
  return allGears?.map((singleGear, i) => {
    return (
      <Grid container spacing={2}>
        <Grid item sm={12} md={4}>
          <Card
            addtocart={true}
            item={singleGear}
            setValue={setAllGears}
            number={i}
          />
        </Grid>
      </Grid>
    );
  });
};

export default Gears;
