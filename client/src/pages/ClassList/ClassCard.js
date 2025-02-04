import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { selectClass, selectUser } from "../../redux/_actions";
import ClassCodeModal from "./sections/ClassCodeModal";
import moment from "moment-timezone";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

function ClassCard(props) {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user);

  const classes = useStyles();

  return (
    <div className="m-4">
      <Card className={classes.root}>
        <Link
          to={`/classes/${props.id}`}
          color="inherit"
          onClick={() => {
            dispatch(selectClass({ classId: props.id }));
            if (user.userData.role === 1) {
              dispatch(
                selectUser({ classId: props.id, userId: user.userData._id })
              );
            }
          }}
        >
          <CardHeader
            title={props.title}
            subheader={moment(props.date).tz("Asia/Seoul").format("YYYY-MM-DD")}
          />
        </Link>
        <CardMedia
          className={classes.media}
          image={props.img}
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component={"span"}>
            {props.comment}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="share">
            <ClassCodeModal
              id={`${props.title}displaycode`}
              entrycode={props.entrycode}
              className={props.title}
            ></ClassCodeModal>
          </IconButton>
          {user.userData && user.userData.role === 0 ? (
            <IconButton aria-label="delete" style={{ marginLeft: "auto" }}>
              <DeleteIcon />
            </IconButton>
          ) : (
            ""
          )}
        </CardActions>
      </Card>
    </div>
  );
}

export default ClassCard;
