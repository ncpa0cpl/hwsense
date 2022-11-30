import React from "react";
import { sleep } from "../utils/sleep";

export const usePooling = <T>(
  poolFn: () => T | Promise<T>,
  init: T,
  interval: number
) => {
  const [value, setValue] = React.useState(init);

  React.useEffect(() => {
    const update = async () => {
      try {
        setValue(await poolFn());
      } catch (e) {
        console.error(e);
      }
    };

    let stop = false;

    (async () => {
      while (!stop) {
        await update();
        await sleep(interval);
      }
    })();

    return () => {
      stop = true;
    };
  }, [interval, poolFn]);

  return value;
};
