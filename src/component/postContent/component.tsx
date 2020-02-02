import {
  Box,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import RateReviewIcon from "@material-ui/icons/RateReview";
import TocIcon from "@material-ui/icons/Toc";
import React from "react";
import ReactMarkdown from "react-markdown";

import { Post as PostDto } from "../../generated/graphql";
import Review from "../review";
import { style } from "./style";

interface ITabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: ITabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

interface IProps {
  post: PostDto;
}

const PostContent: React.FC<IProps> = (p) => {
  const classes = style();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered={true}
      >
        <Tab label="introduction" icon={<TocIcon />} />
        <Tab label="statistics" icon={<EqualizerIcon />} />
        <Tab label="review" icon={<RateReviewIcon />} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ReactMarkdown source={p.post.content} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        HERE we need some great statistics diagram by d3 js
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Review />
      </TabPanel>
    </Paper>
  );
};

export default PostContent;
