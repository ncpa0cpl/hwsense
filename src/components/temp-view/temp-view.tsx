import React from "react";
import { GridItem } from "react-gjs-renderer";
import { Text } from "../text/text";

export type TempViewProps = {
  name: string;
  value: number;
  type: "temp" | "pwr";
};

export const TempView = (props: TempViewProps) => {
  const [maxTemp, setMaxTemp] = React.useState(props.value);
  const [minTemp, setMinTemp] = React.useState(props.value);

  React.useEffect(() => {
    if (props.value > maxTemp) {
      setMaxTemp(props.value);
    }
    if (props.value < minTemp) {
      setMinTemp(props.value);
    }
  }, [props.value]);

  const affix = props.type === "temp" ? "°C" : "W";

  return (
    <>
      <GridItem>
        <Text fontSize="medium">{props.name}</Text>
      </GridItem>
      <GridItem>
        <Text fontSize="medium">
          {props.value.toFixed(1)}
          {affix}
        </Text>
      </GridItem>
      <GridItem>
        <Text fontSize="medium">
          {minTemp.toFixed(1)}
          {affix}
        </Text>
      </GridItem>
      <GridItem>
        <Text fontSize="medium">
          {maxTemp.toFixed(1)}
          {affix}
        </Text>
      </GridItem>
    </>
  );
};
