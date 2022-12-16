import React from "react";
import { Align, ButtonBox, Markup, Span } from "react-gjs-renderer";
import type { AppRoutes } from "../../../screens/navigation";
import type { NavigationTarget } from "../../stack-router/types";
import { useNavigation } from "../../stack-router/use-navigation";

export type NavigationButton = {
  isDefault?: boolean;
  to: NavigationTarget<AppRoutes>;
};

export const NavigationButton = (props: NavigationButton) => {
  const { navigate, getLabel, currentScreen } = useNavigation<AppRoutes>();

  const isActive = React.useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    return props.to.toString() === currentScreen;
  }, [currentScreen, props.to]);

  return (
    <ButtonBox
      horizontalAlign={Align.FILL}
      onClick={React.useCallback(() => navigate(props.to), [props.to])}
      style={{
        background: isActive ? "rgb(28, 113, 216)" : "transparent",
        border: "none",
        borderRadius: "0",
        boxShadow: "none",
        textShadow: "none",
        ":hover": {
          background: isActive
            ? "rgb(28, 113, 216)"
            : "rgba(128, 128, 128, 0.2)",
          border: "none",
        },
      }}
    >
      <Markup margin={[5, 40]}>
        <Span>{getLabel(props.to)}</Span>
      </Markup>
    </ButtonBox>
  );
};
