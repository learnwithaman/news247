import React, { useState, useEffect } from "react";
import { Container, Typography, Grid } from "@material-ui/core";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsContent.css";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(0.25),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const NewsContent = ({
  category,
  newsArray,
  loadMore,
  setLoadMore,
  newsResults,
  searchNews,
  keywordExist,
  setKeywordExist,
}) => {
  const classes = useStyles();

  const [searchedText, setSearchedText] = useState("");

  const handleSearch = (e) => {
    let value = e.target.value;
    if (value !== "") {
      setKeywordExist(true);
    } else {
      setKeywordExist(false);
    }
    setSearchedText(value);
    searchNews(value);
  };

  useEffect(() => {
    if (!keywordExist) {
      setSearchedText("");
    }
  }, [keywordExist]);

  return (
    <Container maxWidth="md">
      <Grid
        container
        style={{ paddingTop: "1rem", paddingLeft: ".5rem" }}
        justify="space-between"
      >
        <Grid item>
          <Typography variant="h6" color="primary">
            {keywordExist ? "" : "/" + category}
          </Typography>
        </Grid>
        <Grid item>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              value={searchedText}
              onChange={handleSearch}
            />
          </div>
        </Grid>
      </Grid>
      <div className="content">
        {newsArray.map((newsItem) => (
          <NewsCard newsItem={newsItem} key={newsItem.title} />
        ))}
        {!keywordExist && loadMore <= newsResults && (
          <>
            <hr />
            <button
              className="loadMore"
              onClick={() => setLoadMore(loadMore + 20)}
            >
              Load More
            </button>
          </>
        )}
      </div>
    </Container>
  );
};

export default NewsContent;
