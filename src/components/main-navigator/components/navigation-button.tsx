import React from "react";
import { Align, FlowBoxEntry, Markup, Span } from "react-gjs-renderer";
import type { AppRoutes } from "../../../screens/navigation";
import type { NavigationTarget } from "../../stack-router/types";
import { useNavigation } from "../../stack-router/use-navigation";

export type NavigationButton = {
  isDefault?: boolean;
  to: NavigationTarget<AppRoutes>;
};

export const NavigationButton = (props: NavigationButton) => {
  const { navigate, getLabel } = useNavigation<AppRoutes>();

  return (
    <FlowBoxEntry
      horizontalAlign={Align.FILL}
      isDefault={props.isDefault}
      onSelect={React.useCallback(() => navigate(props.to), [props.to])}
    >
      <Markup margin={[5, 40]}>
        <Span>{getLabel(props.to)}</Span>
      </Markup>
    </FlowBoxEntry>
  );
};
