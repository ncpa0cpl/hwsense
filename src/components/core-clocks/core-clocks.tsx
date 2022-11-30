import React from "react";
import {
  Align,
  Box,
  Grid,
  GridItem,
  Orientation,
  Separator,
} from "react-gjs-renderer";
import { Settings } from "../../global-state/settings";
import { usePooling } from "../../hooks/use-pooling";
import { Command } from "../../utils/command";
import { Header } from "../header/header";
import { Text } from "../text/text";
import { CoreClockView } from "./components/core-clock-view";

const getCoreClocks = async () => {
  const cmd = new Command("grep", "^[c]pu MHz", "/proc/cpuinfo");
  const result = await cmd.run();

  const lines = result.split("\n");

  const newCoreClocks: { num: number; freq: number }[] = [];
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

  const [avg, setAvg] = React.useState(0);

  React.useEffect(() => {
    const sum = cores.reduce((acc, core) => acc + core.freq, 0);
    setAvg(sum / cores.length);
  }, [cores]);

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
          <Text fontSize="large">Lowest</Text>
        </Box>
      </GridItem>
      <GridItem>
        <Box margin={[0, 25]}>
          <Text fontSize="large">Highest</Text>
        </Box>
      </GridItem>
      {cores.map((core) => (
        <CoreClockView
          key={core.num}
          name={`Core ${core.num}`}
          freq={core.freq}
        />
      ))}
      <GridItem columnSpan={4}>
        <Separator orientation={Orientation.HORIZONTAL} />
      </GridItem>
      <CoreClockView name="Avg" freq={avg} />
    </Grid>
  );
};
