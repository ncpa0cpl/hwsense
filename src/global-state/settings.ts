import { quark } from "react-quarks";

export const Settings = quark(
  {
    cpuFreqPoolingRate: 500,
    tempPoolingRate: 1000,
  },
  {
    selectors: {
      useCpuFreqPoolingRate: (state) => state.cpuFreqPoolingRate,
      useTempPoolingRate: (state) => state.tempPoolingRate,
    },
  }
);
