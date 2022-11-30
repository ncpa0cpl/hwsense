import React from "react";
import { Settings } from "../../global-state/settings";
import { Temps } from "../../global-state/temps";
import { Command } from "../../utils/command";
import { sleep } from "../../utils/sleep";

const getTemps = async () => {
  const cmd = new Command("sensors", "-j");
  const result = await cmd.run();

  const sensorData: object = JSON.parse(result);

  return sensorData;
};

export const TempProber = () => {
  const poolingRate = Settings.useTempPoolingRate();

  React.useEffect(() => {
    const update = async () => {
      try {
        const temps = await getTemps();
        Temps.set(temps);
      } catch (e) {
        console.error(e);
      }
    };

    let stop = false;

    (async () => {
      while (!stop) {
        await update();
        await sleep(poolingRate);
      }
    })();

    return () => {
      stop = true;
    };
  }, [poolingRate]);

  return <></>;
};
