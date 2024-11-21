import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Box } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { Badge } from "react-bootstrap";
import { GenericButton } from "../../components/generic-button";
import { useSearchParams } from "react-router-dom";
import {
  addReview,
  deleteReview,
  getSingleProduct,
  setFavourite,
} from "../../utils/rest-services";
import "./style.scss";
import { useState } from "react";
import { useEffect } from "react";
import { Grid } from "@mui/material";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { KeyValueData } from "../../components/horizontal-card";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "./style.scss";
import { QuantityButton } from "../../components/qunatity-button";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  imageWrapper: {
    flex: "0 0 auto",
    marginRight: theme.spacing(2),
  },
  image: {
    height: "400px",
    objectFit: "contain",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flex: "1 1 auto",
  },
  title: {
    fontWeight: "bold",
    color: "red",
  },
  description: {
    marginTop: theme.spacing(2),
    color: "red",
  },
  rating: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: theme.spacing(2),
    color: "red",
    borderColor: "red",
  },
  badge: {
    backgroundColor: "red",
    marginLeft: theme.spacing(1),
    fontWeight: "bold",
  },
  accordion: {
    width: "100%",
    "& .MuiAccordionSummary-content": {
      alignItems: "center",
    },
  },
  textarea: {
    width: "100%",
    borderRadius: "4px",
    padding: "8px",
    border: "1px solid #ccc",
    "&:focus": {
      outline: "none",
      borderColor: theme.palette.primary.main,
    },
  },
  submitButton: {
    marginTop: "8px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  editButton: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}));

const ProductDetail = () => {
  const classes = useStyles();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [orderDetails, setOrderDetails] = useState({});
  const [favorite, setFavorite] = React.useState(false);
  const [rating, setRating] = useState(0);
  const [value, setValue] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  console.log(reviewSubmitted, "reviewSubmitted");
  const [expanded, setExpanded] = useState(true);

  const handleAccordionChange = (event, isExpanded) => {
    setExpanded(isExpanded);
  };

  const handleFavorite = async () => {
    setFavorite(!favorite);
    setOrderDetails({ ...orderDetails, isFavourite: !favorite });
    const response = await setFavourite(orderDetails._id);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    !rating && setRating(0);
  }, [rating]);

  const reviews2 = [
    { id: 1, comment: "Great product!", rating: 4 },
    { id: 2, comment: "Could be better", rating: 3 },
    { id: 3, comment: "Not worth the money", rating: 2 },
  ];
  const fetchData = async () => {
    try {
      const allGamesData = await getSingleProduct(id);
      setOrderDetails(allGamesData);
      allGamesData?.reviews.reverse().forEach((singleReview) => {
        if (
          singleReview.createdBy.name ===
            JSON.parse(localStorage.getItem("userProfile")).name &&
          singleReview.createdBy.email ===
            JSON.parse(localStorage.getItem("userProfile")).email
        ) {
          setReviewSubmitted(true);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await addReview(id, { rating: rating, comment: value });
      setExpanded(false);
      setOrderDetails(response);
      setReviewSubmitted(true);
      // Do something with the response, like updating the state
    } catch (error) {
      console.log("Error submitting review:", error);
      // Handle the error, like displaying an error message
    }
  };
  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await deleteReview(id, orderDetails?._id);
      setOrderDetails(response);
      setRating(0);
      setValue("");
      setReviewSubmitted(false);
      setExpanded(false);
    } catch (error) {
      console.log("Error deleting review:", error);
    }
  };
  const accordionHeader =
    reviewSubmitted === true
      ? `Your Review (Rating: ${rating})`
      : "Add a Review";
  return (
    <div className="d-flex align-items-start">
      <Grid container>
        <Grid item sm={12} md={5}>
          <div className="image-container-details">
            {orderDetails?.Image && (
              <img
                src={require(`../../../../../nodeJsProject/softec-23-backend/Images/${orderDetails?.Image}`)}
                alt="product"
                className="mr-3"
              />
            )}
          </div>
        </Grid>
        <Grid item sm={12} md={7}>
          <div className="d-flex flex-column justify-content-between m-3">
            <div>
              <Box className="d-flex justify-content-between">
                <Typography variant="h5" className="font-weight-bold">
                  {orderDetails?.Title}
                </Typography>
                <Box style={{ color: "red", fontSize: "30px" }}>
                  {orderDetails?.isFavourite ? (
                    <AiFillHeart onClick={handleFavorite} />
                  ) : (
                    <AiOutlineHeart onClick={handleFavorite} />
                  )}
                </Box>
              </Box>
              <Box className="d-flex justify-content-between align-items-center mb-1 mt-1">
                <Typography variant="body1" className="mt-2">
                  {orderDetails?.Description}
                </Typography>
                <KeyValueData
                  keyy={"Min Age"}
                  value={`${orderDetails?.minAge}`}
                />
              </Box>
              <Typography variant="body1" className="mt-2">
                <KeyValueData
                  keyy={"Platform"}
                  value={`${orderDetails?.Platform}`}
                />
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                className="mt-2 justify-content-between align-items-center d-flex"
              >
                <div>
                  <Badge bg="danger">
                    {orderDetails?.isDeleted ? "Unavailable" : "Available"}
                  </Badge>{" "}
                </div>
                <div className="generalButton"></div>
              </Box>
            </div>
          </div>
          <Accordion
            className={classes.accordion}
            expanded={expanded}
            onChange={handleAccordionChange}
          >
            <AccordionSummary style={{ width: "100%", padding: "0 10px" }}>
              <Box
                className="d-flex justify-content-between"
                style={{ width: "100%" }}
              >
                <Rating
                  name="simple-controlled"
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                />
                <Typography>{accordionHeader}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="review-textarea"
                    label="Comment"
                    variant="outlined"
                    value={value}
                    onChange={handleInputChange}
                    multiline
                    rows={4}
                    className={classes.textarea}
                  />
                </Grid>
                <Grid item xs={12} className="d-flex justify-content-between">
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    className={classes.submitButton}
                    disabled={reviewSubmitted}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleDeleteReview}
                    className={classes.submitButton}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <div className="parentReview">
            {orderDetails?.reviews &&
              orderDetails.reviews.slice(0, 5).map((review) => (
                <div key={review._id}>
                  {review.comment && (
                    <KeyValueData keyy={"Review"} value={review.comment} />
                  )}{" "}
                  <Rating value={review?.rating} readOnly />
                  <KeyValueData
                    keyy={"Review By"}
                    value={review?.createdBy?.name}
                  />
                </div>
              ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default ProductDetail;
