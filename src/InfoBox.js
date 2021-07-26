import React from 'react';

import { Card, CardContent, Typography } from "@material-ui/core";


function InfoBox({ title, total, cases }) {
  return (
    <Card className="infoBox">
      <CardContent>
      {/* Title i.e: CornonaVirus Cases */}
      <Typography className="infobox__title" color="textSecondary">
      {title}
      </Typography>
      {/* +120K Member of Cases */}
      {/* 1.2M Total */}
      <h2 className="infoBox__cases">{cases}</h2>
      <Typography className="infoBox__total">
      {total}
      </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
