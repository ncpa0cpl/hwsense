import React from "react";
import { Text } from "../text/text";

export const Header = (
  props: { children?: string } & Omit<
    JSX.IntrinsicElements["MARKUP"],
    "children"
  >
) => {
  const { children, ...textProps } = props;

  return (
    <Text
      margin={[20, 0, 5]}
      {...textProps}
      fontSize="x-large"
      fontWeight="bold"
    >
      {children ?? ""}
    </Text>
  );
};
