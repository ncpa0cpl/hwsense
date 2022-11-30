import React from "react";
import { Align, Box } from "react-gjs-renderer";
import { CoreClocks } from "../../components/core-clocks/core-clocks";
import { CoreTemps } from "../../components/core-temps/core-temps";

export const CpuScreen = () => {
  return (
    <Box verticalAlign={Align.FILL}>
      <CoreClocks />
      <CoreTemps />
    </Box>
  );
};
