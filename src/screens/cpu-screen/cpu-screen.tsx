import React from "react";
import { Box, ScrollBox } from "react-gjs-renderer";
import { CoreClocks } from "../../components/core-clocks/core-clocks";
import { CoreTemps } from "../../components/core-temps/core-temps";

export const CpuScreen = () => {
  return (
    <ScrollBox useChildHeight useChildWidth>
      <Box>
        <CoreClocks />
        <CoreTemps />
      </Box>
    </ScrollBox>
  );
};
