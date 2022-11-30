import React from "react";
import { Align, Box } from "react-gjs-renderer";
import { GpuTemps } from "../../components/gpu-temps/gpu-temps";

export const GpuScreen = () => {
  return (
    <Box verticalAlign={Align.FILL}>
      <GpuTemps />
    </Box>
  );
};
