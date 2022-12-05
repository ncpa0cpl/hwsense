import React from "react";
import type { NavigationTarget } from "./types";

export const StackContext = React.createContext({
  registerScreen(path: string, label: string, navigateTo: () => void): void {},
  detachScreen(path: string): void {},
  navigate<P extends string = string>(path: NavigationTarget<P>): void {},
  goBack(): void {},
  getLabel<P extends string = string>(path: NavigationTarget<P>): string {
    return "";
  },
  currentScreen: "",
});
