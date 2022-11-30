import React from "react";
import { Align, Box, Grid, GridItem } from "react-gjs-renderer";
import { Settings } from "../../global-state/settings";
import { usePooling } from "../../hooks/use-pooling";
import { Command } from "../../utils/run-cmd";
import { Header } from "../header/header";
import { Text } from "../text/text";
import { CoreTempView } from "./components/core-temp-view";

export type CoreTemps = Array<{ name: string; temp: number }>;

const getTemps = (): CoreTemps => {
  const cmd = new Command("sensors", "-j");
  const result = cmd.run();

  const sensorData = JSON.parse(result);

  const coretemps: Array<{ name: string; temp: number }> = [];

  for (const [property, value] of Object.entries(sensorData)) {
    if (property.startsWith("coretemp")) {
      for (const [name, temps] of Object.entries(value as object)) {
        if (name.startsWith("Package")) {
          const tempKey = Object.keys(temps as object).find((key) =>
            key.endsWith("_input")
          );

          if (tempKey) {
            coretemps.unshift({ name: "Package", temp: temps[tempKey] });
          }
        }

        if (name.startsWith("Core")) {
          const tempKey = Object.keys(temps as object).find((key) =>
            key.endsWith("_input")
          );

          if (tempKey) {
            coretemps.push({ name, temp: temps[tempKey] });
          }
        }
      }

      break;
    }
  }

  return coretemps;
};

export const CoreTemps = () => {
  const poolingRate = Settings.useCpuTempPoolingRate();
  const coreTemps = usePooling(getTemps, [], poolingRate);

  return (
    <Grid margin={[20, 0, 0]} rowSpacing={10} columns={4}>
      <GridItem columnSpan={4}>
        <Header horizontalAlign={Align.CENTER}>CPU Temperature</Header>
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
      {coreTemps.map((core) => (
        <CoreTempView key={core.name} {...core} />
      ))}
    </Grid>
  );
};
