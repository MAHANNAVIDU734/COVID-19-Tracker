import React from 'react';
import { Card, CardContent, typography } from "@material-ui/core";

function InfoBox({ title, total, cases }) {
  return (
    <Card className="infoBox">
      <CardContent>
      {/* Title i.e: CornonaVirus Cases */}
      <typography className="infobox__title" color="textSecondary">
      {title}
      </typography>
      {/* +120K Member of Cases */}
      {/* 1.2M Total */}
      <h2 className="infoBox__cases">{cases}</h2>
      <typography className="infoBox__total">
      {total}
      </typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
