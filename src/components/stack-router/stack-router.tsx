import React from "react";
import { Separator, StackTransitionType, useStack } from "react-gjs-renderer";

export const StackRouter = (props: {
  children: React.ReactElement | React.ReactElement[];
}) => {
  const Stack = useStack();

  return (
    <>
      <Stack.Switcher />
      <Separator margin={[5, 0]} />
      <Stack.Stack
        transitionType={StackTransitionType.SLIDE_LEFT_RIGHT}
        transitionDuration={750}
      >
        {props.children}
      </Stack.Stack>
    </>
  );
};
