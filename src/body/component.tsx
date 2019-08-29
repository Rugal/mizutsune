import { Container, Typography } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";

import { ScreenBody, style } from "./style";

const Body: React.FC = () => {
  const classes = style();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <ScreenBody>
      <Container maxWidth="md">
        <div className={classes.root}>
          <ExpansionPanel expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>General settings</Typography>
              <Typography className={classes.secondaryHeading}>I am an expansion panel</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                maximus est, id dignissim quam.
          </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography className={classes.heading}>Users</Typography>
              <Typography className={classes.secondaryHeading}>
                You are currently not an owner
          </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
                diam eros in elit. Pellentesque convallis laoreet laoreet.
          </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography className={classes.heading}>Advanced settings</Typography>
              <Typography className={classes.secondaryHeading}>
                Filtering has been entirely disabled for whole web server
          </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                vitae egestas augue. Duis vel est augue.
          </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography className={classes.heading}>Personal data</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                vitae egestas augue. Duis vel est augue.
          </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </Container>
    </ScreenBody >
  );
};
export default Body;
