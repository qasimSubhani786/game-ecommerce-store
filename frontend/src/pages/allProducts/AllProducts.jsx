import React from "react";
import { Grid } from "@mui/material";
import "./style.scss";
import { Card } from "../../components";
const AllProducts = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card />
        </Grid>
      </Grid>
    </>
  );
};

export default AllProducts;
