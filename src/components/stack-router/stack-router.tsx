import React from "react";
import { Separator, StackTransitionType, useStack } from "react-gjs-renderer";

export const StackRouter = (props: {
  children: React.ReactElement | React.ReactElement[];
  wrapper?: (children: React.ReactElement) => React.ReactElement;
}) => {
  const Stack = useStack();

  const wrapper = props.wrapper ?? ((children) => <>{children}</>);

  return (
    <>
      <Stack.Switcher />
      <Separator margin={[5, 0]} />
      {wrapper(
        <Stack.Stack
          transitionType={StackTransitionType.NONE}
          transitionDuration={500}
        >
          {props.children}
        </Stack.Stack>
      )}
    </>
  );
};
