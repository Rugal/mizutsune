import {
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";

export const style = makeStyles((theme: Theme) =>
  createStyles({
    iconFilled: {
      color: "#ff6d75",
    },
    iconHover: {
      color: "#ff3d47",
    },
    rating: {
      alignItems: "center",
      display: "flex",
    },
    unselectable: {
      mozUserSelect: "none", /* Firefox */
      msUserSelect: "none", /* IE10+/Edge */
      userSelect: "none", /* Standard */
      webkitUserSelect: "none", /* Safari */
    },
  }),
);
