import React from "react";
import { Align, Box, Grid, GridItem } from "react-gjs-renderer";
import { Temps } from "../../global-state/temps";
import { Header } from "../header/header";
import { TempView } from "../temp-view/temp-view";
import { Text } from "../text/text";

export type CoreTemps = Array<{ name: string; value: number }>;

const getCpuTemps = (temps: Record<string, any>): CoreTemps => {
  const coretemps: Array<{ name: string; value: number }> = [];

  for (const [property, value] of Object.entries(temps)) {
    if (property.startsWith("coretemp")) {
      for (const [name, temps] of Object.entries(value as object)) {
        if (name.startsWith("Package")) {
          const tempKey = Object.keys(temps as object).find((key) =>
            key.endsWith("_input")
          );

          if (tempKey) {
            coretemps.unshift({ name: "Package", value: temps[tempKey] });
          }
        }

        if (name.startsWith("Core")) {
          const tempKey = Object.keys(temps as object).find((key) =>
            key.endsWith("_input")
          );

          if (tempKey) {
            coretemps.push({ name, value: temps[tempKey] });
          }
        }
      }

      break;
    }

    if (property.startsWith("k10temp")) {
      for (const [name, temps] of Object.entries(value as object)) {
        if (name.startsWith("Tctl")) {
          const tempKey = Object.keys(temps as object).find((key) =>
            key.endsWith("_input")
          );

          if (tempKey) {
            coretemps.unshift({ name: "Package", value: temps[tempKey] });
          }
        } else if (name.startsWith("Tccd")) {
          const tempKey = Object.keys(temps as object).find((key) =>
            key.endsWith("_input")
          );

          if (tempKey) {
            coretemps.push({
              name: `CCD ${name.replace("Tccd", "")}`,
              value: temps[tempKey],
            });
          }
        }
      }

      break;
    }
  }

  return coretemps;
};

export const CoreTemps = () => {
  const [coreTemps, setCoreTemps] = React.useState<CoreTemps>([]);

  React.useEffect(() => {
    const sub = Temps.subscribe((temps) => {
      const newCoreTemps = getCpuTemps(temps);
      setCoreTemps(newCoreTemps);
    });

    return () => sub.cancel();
  }, []);

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
          <Text fontSize="large">Lowest</Text>
        </Box>
      </GridItem>
      <GridItem>
        <Box margin={[0, 25]}>
          <Text fontSize="large">Highest</Text>
        </Box>
      </GridItem>
      {coreTemps.map((core) => (
        <TempView key={core.name} type="temp" {...core} />
      ))}
    </Grid>
  );
};
