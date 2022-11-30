import { quark } from "react-quarks";

export const Settings = quark(
  {
    cpuFreqPoolingRate: 500,
    cpuTempPoolingRate: 1000,
  },
  {
    selectors: {
      useCpuFreqPoolingRate: (state) => state.cpuFreqPoolingRate,
      useCpuTempPoolingRate: (state) => state.cpuTempPoolingRate,
    },
  }
);
