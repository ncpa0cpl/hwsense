import React from "react";
import { Markup, Span } from "react-gjs-renderer";

export const Text = (
  props: {
    children: string | string[];
  } & JSX.IntrinsicElements["M_SPAN"] &
    Omit<JSX.IntrinsicElements["MARKUP"], "children">
) => {
  const {
    children,
    wrap = false,
    wrapMode,
    ellipsize,
    justify,
    lines,
    selectable,
    margin,
    verticalAlign,
    horizontalAlign,
    ...spanProps
  } = props;

  return (
    <Markup
      wrap={wrap}
      wrapMode={wrapMode}
      ellipsize={ellipsize}
      justify={justify}
      lines={lines}
      selectable={selectable}
      margin={margin}
      verticalAlign={verticalAlign}
      horizontalAlign={horizontalAlign}
    >
      <Span {...spanProps}>{children}</Span>
    </Markup>
  );
};
