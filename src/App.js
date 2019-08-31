import React, { useState } from "react";
import Chip from "@material-ui/core/Chip";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  TextField,
  InputAdornment,
  Typography
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: 20,
    left: "50%",
    marginLeft: -160
  },
  card: {
    position: "fixed",
    bottom: 20,
    paddingBottom: 50,
    display: "flex",
    flexDirection: "column",
    marginLeft: -12,
    zIndex: -1,
    maxWidth: 344
  },
  closeButton: {
    position: "absolute",
    top: 2,
    right: 2
  },
  closeButtonIcon: {
    width: 14,
    height: 14
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    overflowX: "scroll"
  },
  chip: {
    marginLeft: 5
  },
  chipLabel: {
    width: 140,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "inline-block"
  },
  header: {
    display: "flex",
    width: "100%",
    fontSize: 11,
    marginBottom: 4
  },
  searchInput: {
    minWidth: 200
  },
  title: {
    fontSize: 14
  },
  widget: {
    boxSizing: "border-box",
    padding: 10,
    boxShadow: "0px 0px 2px 2px rgba(200, 200, 200, 0.25)",
    borderRadius: 3,
    backgroundColor: "white",
    width: 320,
    overflowX: "scroll"
  },
  widgetNoBorder: {
    border: "none",
    boxSizing: "border-box",
    padding: 10,
    backgroundColor: "white",
    width: 320,
    overflowX: "scroll"
  }
});

const topics = [
  {
    title: "Can I purchase just one plaything by itself?",
    content: `We do not sell any Play Kit item on its own. We have crafted each kit to be developmentally appropriate for each age group and as a whole, each kit has even more value than the playthings do independently.`
  },
  {
    title: "What research are the toys based on?",
    content: `<p>We’ve done the research to develop products that are right for your child’s development stage by stage.</p><p>Every product and piece of information in each Play Kit was informed by published research in the field of child development and reviewed by child development specialists from multiple disciplines.</p>`
  },
  {
    title: "Do I need to get toys every month?",
    content: `<p>Each item is specially designed for your child's stage of development.</p><p>You will be sent a kit full of playthings every 2-3 months until you stop your subscription or until we no longer offer products for your child's age.</p><p>If your child has aged out of a play kit that you would still like to receive, you may click "add" to receive any previous kit desired.</p>`
  }
];

const App = props => {
  const classes = useStyles();
  const [isExpanded, setIsExpanded] = useState(false);
  const [chosenTopic, setChosenTopic] = useState(null);

  return (
    <div className={classes.root}>
      {chosenTopic ? (
        <Slide
          direction="up"
          in={chosenTopic !== null}
          mountOnEnter
          unmountOnExit
        >
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary">
                {chosenTopic.title}
                <IconButton
                  className={classes.closeButton}
                  size="small"
                  onClick={() => {
                    setChosenTopic(null);
                  }}
                >
                  <CloseIcon className={classes.closeButtonIcon} />
                </IconButton>
              </Typography>

              <Typography
                variant="body2"
                component="p"
                dangerouslySetInnerHTML={{ __html: chosenTopic.content }}
              ></Typography>
            </CardContent>
          </Card>
        </Slide>
      ) : null}
      <div className={chosenTopic ? classes.widgetNoBorder : classes.widget}>
        <div className={classes.header}>
          <span>People ask:</span>
        </div>
        <div className={classes.buttons}>
          {isExpanded ? (
            <TextField
              className={classes.searchInput}
              placeholder="type to search.."
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      onClick={() => {
                        setIsExpanded(!isExpanded);
                      }}
                    />
                  </InputAdornment>
                )
              }}
              size="small"
            />
          ) : (
            <IconButton
              size="small"
              onClick={() => {
                setIsExpanded(!isExpanded);
              }}
            >
              <SearchIcon />
            </IconButton>
          )}

          {topics.map((topic, index) => {
            return (
              <Chip
                key={index}
                className={classes.chip}
                classes={{
                  label: classes.chipLabel
                }}
                label={topic.title}
                onClick={() => {
                  setChosenTopic(topic);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
