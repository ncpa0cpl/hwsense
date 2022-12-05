import React from "react";
import { Align, Box, Orientation, render, ScrollBox } from "react-gjs-renderer";
import { MainNavigator } from "./components/main-navigator/main-navigator";
import { TempProber } from "./components/temp-prober.ts/temp-prober";
import { MainRoutes, Stack } from "./screens/navigation";
import { Win } from "./window-context";

const App = () => {
  return <MainRoutes />;
};

render(
  <Win title="HwSense">
    <Stack.StackRoot>
      <ScrollBox verticalAlign={Align.FILL} horizontalAlign={Align.FILL}>
        <Box
          verticalAlign={Align.FILL}
          horizontalAlign={Align.FILL}
          orientation={Orientation.HORIZONTAL}
        >
          <MainNavigator />
          <Box margin={[25, 10, 25, 0]}>
            <App />
          </Box>
          <TempProber />
        </Box>
      </ScrollBox>
    </Stack.StackRoot>
  </Win>
);
