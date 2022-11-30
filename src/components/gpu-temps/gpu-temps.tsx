import React from "react";
import { Align, Box, Grid, GridItem } from "react-gjs-renderer";
import { Temps } from "../../global-state/temps";
import { getTempInput } from "../../utils/get-temp-input";
import { Header } from "../header/header";
import { TempView } from "../temp-view/temp-view";
import { Text } from "../text/text";

type GpuTemps = Array<{
  name: AmdSensors;
  value: number;
  type: "temp" | "pwr";
}>;

enum AmdSensors {
  Edge = "Edge",
  Junction = "Junction",
  Memory = "Memory",
  Power = "Power",
}

const AmdSensorsOrder = new Map([
  [AmdSensors.Edge, 0],
  [AmdSensors.Junction, 1],
  [AmdSensors.Memory, 2],
  [AmdSensors.Power, 3],
]);

const getGpuTemps = (temps: Record<string, any>) => {
  const coretemps: GpuTemps = [];

  for (const [property, value] of Object.entries(temps)) {
    if (typeof value === "object" && value !== null) {
      if (property.startsWith("amdgpu")) {
        if ("edge" in value) {
          getTempInput(value.edge, (v) => {
            coretemps.push({ name: AmdSensors.Edge, value: v, type: "temp" });
          });
        }

        if ("junction" in value) {
          getTempInput(value.junction, (v) => {
            coretemps.push({
              name: AmdSensors.Junction,
              value: v,
              type: "temp",
            });
          });
        }

        if ("mem" in value) {
          getTempInput(value.mem, (v) => {
            coretemps.push({ name: AmdSensors.Memory, value: v, type: "temp" });
          });
        }

        if ("PPT" in value) {
          const powerAdapter = value.PPT;
          if (typeof powerAdapter === "object" && powerAdapter !== null) {
            for (const [key, pwr] of Object.entries(powerAdapter)) {
              if (key.endsWith("_average")) {
                coretemps.push({
                  name: AmdSensors.Power,
                  value: pwr as number,
                  type: "pwr",
                });
                break;
              }
            }
          }
        }
      }
    }
  }

  coretemps.sort((a, b) => {
    const aOrder = AmdSensorsOrder.get(a.name)!;
    const bOrder = AmdSensorsOrder.get(b.name)!;

    return aOrder - bOrder;
  });

  return coretemps;
};

export const GpuTemps = () => {
  const [gpuTemps, setGpuTemps] = React.useState<GpuTemps>([]);

  React.useEffect(() => {
    const sub = Temps.subscribe((temps) => {
      const newCoreTemps = getGpuTemps(temps);
      setGpuTemps(newCoreTemps);
    });

    return () => sub.cancel();
  }, []);

  return (
    <Grid margin={[20, 0, 0]} rowSpacing={10} columns={4}>
      <GridItem columnSpan={4}>
        <Header horizontalAlign={Align.CENTER}>GPU Temperature</Header>
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
      {gpuTemps.map((entry) => (
        <TempView key={entry.name} {...entry} />
      ))}
    </Grid>
  );
};
