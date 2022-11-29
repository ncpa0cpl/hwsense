import React from "react";
import { exit, Window } from "react-gjs-renderer";

export const Win = ({
  children,
  title,
}: React.PropsWithChildren<{ title?: string }>) => {
  return (
    <Window title={title} defaultHeight={600} minWidth={550} onDestroy={exit}>
      {children}
    </Window>
  );
};
