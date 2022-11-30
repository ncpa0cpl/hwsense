import React from "react";
import { GridItem } from "react-gjs-renderer";
import { Text } from "../../text/text";
import type { CoreTemps } from "../core-temps";

export type CoreTempViewProps = CoreTemps[number];

export const CoreTempView = (props: CoreTempViewProps) => {
  const [maxTemp, setMaxTemp] = React.useState(props.temp);
  const [minTemp, setMinTemp] = React.useState(props.temp);

  React.useEffect(() => {
    if (props.temp > maxTemp) {
      setMaxTemp(props.temp);
    }
    if (props.temp < minTemp) {
      setMinTemp(props.temp);
    }
  }, [props.temp]);

  return (
    <>
      <GridItem>
        <Text fontSize="medium">{props.name}</Text>
      </GridItem>
      <GridItem>
        <Text fontSize="medium">{props.temp.toFixed(1)}°C</Text>
      </GridItem>
      <GridItem>
        <Text fontSize="medium">{minTemp.toFixed(1)}°C</Text>
      </GridItem>
      <GridItem>
        <Text fontSize="medium">{maxTemp.toFixed(1)}°C</Text>
      </GridItem>
    </>
  );
};
