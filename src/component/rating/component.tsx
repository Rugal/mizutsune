import { Box, Typography } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Rating from "@material-ui/lab/Rating";
import React from "react";

import { __ } from "../../app/common";
import { style } from "./style";

interface IProps {
  className?: string;
  readonly?: boolean;
  setValue?: (value: number | null) => any;
  value: number | null;
}

const Rate: React.FC<IProps> = (p) => {
  const classes = style();

  const handler = (event: React.ChangeEvent<{}>, newValue: number | null) => p.setValue && p.setValue(newValue);

  const css = {
    iconFilled: classes.iconFilled,
    iconHover: classes.iconHover,
  };

  const rateNumber = __(p.value, 0) > 0 && <Box ml={2}>
    <Typography className={classes.unselectable} variant="h4" color="secondary" gutterBottom={false}>
      {p.value}
    </Typography>
  </Box>;

  return (
    <Box className={`${p.className} ${classes.rating}`}>
      <Rating
        name={"" + p.value}
        readOnly={__(p.readonly, true)}
        classes={css}
        value={p.value}
        icon={<FavoriteIcon fontSize="inherit" />}
        onChange={handler}
        precision={1}
      />
      {rateNumber}
    </Box>
  );
};

export default Rate;
