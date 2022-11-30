import React from "react";

export const usePooling = <T>(poolFn: () => T, init: T, interval: number) => {
  const [value, setValue] = React.useState(init);

  React.useEffect(() => {
    const update = () => {
      try {
        setValue(poolFn());
      } catch (e) {
        console.error(e);
      }
    };

    update();

    const intervalId = setInterval(() => {
      update();
    }, interval);

    return () => clearInterval(intervalId);
  }, [interval, poolFn]);

  return value;
};
