import React from "react";
import { ScrollBox } from "react-gjs-renderer";
import { createStack } from "../components/stack-router/create-stack";
import { createStackTree } from "../components/stack-router/stack-tree";
import type { CollectNodePaths } from "../components/stack-router/types";
import { CpuScreen } from "./cpu-screen/cpu-screen";
import { GpuScreen } from "./gpu-screen/gpu-screen";
import { SystemInfoScreen } from "./system-info/system-info";
import { SystemMemoryScreen } from "./system-memory/system-memory";

export const StackTree = createStackTree({
  systemInfo: {},
  cpuStats: {},
  gpuStats: {},
  systemMemory: {},
});

export type AppRoutes = CollectNodePaths<typeof StackTree>;

export const Stack = createStack(StackTree);

export const MainRoutes = () => {
  return (
    <Stack.StackSwitch
      transitionDuration={0}
      wrapper={(children) => (
        <ScrollBox useChildHeight useChildWidth>
          {children}
        </ScrollBox>
      )}
      screens={[
        {
          label: "System Info",
          uid: StackTree.systemInfo.$(),
          component: <SystemInfoScreen />,
        },
        {
          label: "CPU",
          uid: StackTree.cpuStats.$(),
          component: <CpuScreen />,
        },
        {
          label: "GPU",
          uid: StackTree.gpuStats.$(),
          component: <GpuScreen />,
        },
        {
          label: "System Memory",
          uid: StackTree.systemMemory.$(),
          component: <SystemMemoryScreen />,
        },
      ]}
    />
  );
};
