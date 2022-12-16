import React from "react";
import { StackContext } from "./stack-context";

export const useNavigation = <P extends string = string>() => {
  const ctx = React.useContext(StackContext);

  return {
    navigate: ctx.navigate<P>,
    goBack: ctx.goBack,
    getLabel: ctx.getLabel<P>,
    currentScreen: ctx.currentScreen,
  };
};
