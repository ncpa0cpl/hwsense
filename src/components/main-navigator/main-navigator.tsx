import React from "react";
import { Align, Box, ScrollBox } from "react-gjs-renderer";
import { StackTree } from "../../screens/navigation";
import { NavigationButton } from "./components/navigation-button";

export const MainNavigator = () => {
  return (
    <ScrollBox
      style={{
        background: "rgba(20, 20, 20, 0.05)",
        borderRight: "1px solid rgba(20, 20, 20, 0.2)",
      }}
      useChildWidth
      verticalAlign={Align.FILL}
      horizontalAlign={Align.START}
    >
      <Box horizontalAlign={Align.FILL}>
        <NavigationButton to={StackTree.systemInfo} />
        <NavigationButton to={StackTree.cpuStats} />
        <NavigationButton to={StackTree.gpuStats} />
        <NavigationButton to={StackTree.systemMemory} />
      </Box>
    </ScrollBox>
  );
};
