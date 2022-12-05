import React from "react";
import {
  Align,
  FlowBox,
  Orientation,
  ScrollBox,
  SelectionMode,
} from "react-gjs-renderer";
import { StackTree } from "../../screens/navigation";
import { NavigationButton } from "./components/navigation-button";

export const MainNavigator = () => {
  return (
    <ScrollBox
      style={{
        background: "rgba(0, 0, 0, 0.2)",
      }}
      useChildWidth
      verticalAlign={Align.FILL}
      horizontalAlign={Align.START}
    >
      <FlowBox
        selectionMode={SelectionMode.BROWSE}
        orientation={Orientation.VERTICAL}
        maxChildrenPerLine={1}
        sameSizeChildren
      >
        <NavigationButton to={StackTree.systemInfo} isDefault />
        <NavigationButton to={StackTree.cpuStats} />
        <NavigationButton to={StackTree.gpuStats} />
        <NavigationButton to={StackTree.systemMemory} />
      </FlowBox>
    </ScrollBox>
  );
};
