import React from "react";
import { exit, Window } from "react-gjs-renderer";

export const Win = ({
  children,
  title,
}: React.PropsWithChildren<{ title?: string }>) => {
  return (
    <Window title={title} defaultHeight={800} minWidth={650} onDestroy={exit}>
      {children}
    </Window>
  );
};
