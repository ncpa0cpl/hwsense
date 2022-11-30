import React from "react";
import { GridItem } from "react-gjs-renderer";
import { Text } from "../../text/text";

export type CoreClockViewProps = { name: string; freq: number };

export const CoreClockView = (props: CoreClockViewProps) => {
  const [maxFreq, setMaxFreq] = React.useState(props.freq);
  const [minFreq, setMinFreq] = React.useState(props.freq);

  React.useEffect(() => {
    if (props.freq) {
      if (props.freq > maxFreq || maxFreq === 0) {
        setMaxFreq(props.freq);
      }
      if (props.freq < minFreq || minFreq === 0) {
        setMinFreq(props.freq);
      }
    }
  }, [props.freq]);

  return (
    <>
      <GridItem>
        <Text fontSize="medium">{props.name}</Text>
      </GridItem>
      <GridItem>
        <Text fontSize="medium">{props.freq.toFixed(2)} MHz</Text>
      </GridItem>
      <GridItem>
        <Text fontSize="medium">{minFreq.toFixed(2)} MHz</Text>
      </GridItem>
      <GridItem>
        <Text fontSize="medium">{maxFreq.toFixed(2)} MHz</Text>
      </GridItem>
    </>
  );
};
