import React from "react";
import { Align, Box, Grid, GridItem } from "react-gjs-renderer";
import { Settings } from "../../global-state/settings";
import { usePooling } from "../../hooks/use-pooling";
import { Command } from "../../utils/run-cmd";
import { Header } from "../header/header";
import { Text } from "../text/text";
import type { CoreClockViewProps } from "./components/core-clock-view";
import { CoreClockView } from "./components/core-clock-view";

const getCoreClocks = () => {
  const cmd = new Command("grep", '"^[c]pu MHz"', "/proc/cpuinfo");
  const result = cmd.run();

  const lines = result.split("\n");

  const newCoreClocks: CoreClockViewProps[] = [];
  for (const [index, line] of lines.entries()) {
    if (line.includes(":")) {
      const [, freq] = line.split(":");
      newCoreClocks.push({
        num: index,
        freq: Number(freq!.trim()),
      });
    }
  }

  return newCoreClocks;
};

export const CoreClocks = () => {
  const poolingRate = Settings.useCpuFreqPoolingRate();
  const cores = usePooling(getCoreClocks, [], poolingRate);

  return (
    <Grid rowSpacing={10} columns={4}>
      <GridItem columnSpan={4}>
        <Header horizontalAlign={Align.CENTER}>CPU Frequency</Header>
      </GridItem>
      <GridItem>
        <Box margin={[0, 10, 0, 0]}></Box>
      </GridItem>
      <GridItem>
        <Box margin={[0, 25]}>
          <Text fontSize="large">Current</Text>
        </Box>
      </GridItem>
      <GridItem>
        <Box margin={[0, 25]}>
          <Text fontSize="large">Minimum</Text>
        </Box>
      </GridItem>
      <GridItem>
        <Box margin={[0, 25]}>
          <Text fontSize="large">Maximum</Text>
        </Box>
      </GridItem>
      {cores.map((core) => (
        <CoreClockView key={core.num} {...core} />
      ))}
    </Grid>
  );
};
