import React from "react";
import { Box, render, ScrollBox, StackItem } from "react-gjs-renderer";
import { StackRouter } from "./components/stack-router/stack-router";
import { CpuScreen } from "./screens/cpu-screen/cpu-screen";
import { GpuScreen } from "./screens/gpu-screen/gpu-screen";
import { Win } from "./window-context";

const App = () => {
  return (
    <StackRouter>
      <StackItem label="CPU">
        <CpuScreen />
      </StackItem>
      <StackItem label="GPU">
        <GpuScreen />
      </StackItem>
    </StackRouter>
  );
};

render(
  <Win title="HwSense">
    <ScrollBox margin={[25, 10, 25, 0]} useChildHeight useChildWidth>
      <Box>
        <App />
      </Box>
    </ScrollBox>
  </Win>
);
