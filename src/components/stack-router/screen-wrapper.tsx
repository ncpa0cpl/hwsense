import React from "react";
import { StackScreen } from "react-gjs-renderer";
import type { StackProps } from "react-gjs-renderer/dist/gjs-elements/stack/stack";
import { StackContext } from "./stack-context";

export type StackSwitchProps<P extends string> = {
  screens: Array<{
    uid: P;
    label: string;
    component: React.ReactElement;
    isDefault?: boolean;
  }>;
  wrapper?: (children: React.ReactElement) => React.ReactElement;
} & StackProps;

export const StackScreenWrapper = (
  props: StackSwitchProps<string>["screens"][number] & {
    navigate: (to: string) => void;
  }
) => {
  const ctx = React.useContext(StackContext);

  React.useEffect(() => {
    const navigateHere = () => {
      props.navigate(props.uid);
    };

    ctx.registerScreen(props.uid, props.label, navigateHere);
    return () => ctx.detachScreen(props.uid);
  }, [ctx.registerScreen]);

  return (
    <StackScreen uid={props.uid} label={props.label}>
      {props.component}
    </StackScreen>
  );
};
