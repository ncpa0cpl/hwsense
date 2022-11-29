import React from "react";
import {
  Align,
  Box,
  Grid,
  GridItem,
  Markup,
  render,
  ScrollBox,
  Separator,
  Span,
} from "react-gjs-renderer";
import { Command } from "./utils/run-cmd";
import { Win } from "./window-context";

const Text = (
  props: {
    children: string | string[];
    selectable?: boolean;
  } & JSX.IntrinsicElements["M_SPAN"]
) => {
  const { children, ...rest } = props;

  return (
    <Markup wrap={false} selectable={props.selectable}>
      <Span {...rest}>{children}</Span>
    </Markup>
  );
};

type CoreClock = { num: number; freq: number };

const CpuView = (props: CoreClock) => {
  const [maxFreq, setMaxFreq] = React.useState(props.freq);
  const [minFreq, setMinFreq] = React.useState(props.freq);

  React.useEffect(() => {
    if (props.freq > maxFreq) {
      setMaxFreq(props.freq);
    }
    if (props.freq < minFreq) {
      setMinFreq(props.freq);
    }
  }, [props.freq]);

  return (
    <>
      <GridItem>
        <Text fontSize="medium">Core {props.num.toString()}</Text>
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

const App = () => {
  const [cores, setCores] = React.useState<CoreClock[]>([]);

  const getCoreClocks = () => {
    try {
      const cmd = new Command("grep", '"^[c]pu MHz"', "/proc/cpuinfo");
      const result = cmd.run();

      const lines = result.split("\n");

      const newCoreClocks = [];
      for (const [index, line] of lines.entries()) {
        if (line.includes(":")) {
          const [, freq] = line.split(":");
          newCoreClocks.push({
            num: index,
            freq: Number(freq!.trim()),
          });
        }
      }

      setCores(newCoreClocks);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    getCoreClocks();

    const interval = setInterval(() => {
      getCoreClocks();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Grid rowSpacing={10} columns={4}>
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
      <GridItem columnSpan={4}>
        <Separator margin={[2, 0]} horizontalAlign={Align.FILL} />
      </GridItem>
      {cores.map((core) => (
        <CpuView key={core.num} {...core} />
      ))}
    </Grid>
  );
};

render(
  <Win title="HwSense">
    <ScrollBox margin={[25, 10, 25, 0]} useChildHeight useChildWidth>
      <App />
    </ScrollBox>
  </Win>
);
