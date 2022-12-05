import React from "react";
import { useStack } from "react-gjs-renderer";
import { quark } from "react-quarks";
import { collectNodePaths } from "./collect-node-paths";
import type { StackSwitchProps } from "./screen-wrapper";
import { StackScreenWrapper } from "./screen-wrapper";
import { StackContext } from "./stack-context";
import type { StackTree } from "./stack-tree";
import type { CreateStackResult, NavigationTarget } from "./types";

export const createStack = <T extends StackTree<any, any>>(
  stackTree: T
): CreateStackResult<T> => {
  const stackData = quark(
    {
      stackPaths: new Set(collectNodePaths(stackTree)),
      screenMap: new Map<string, { navigateTo(): void; label: string }>(),
      history: [] as string[],
    },
    {
      actions: {
        pushHistory(state, path: string) {
          return { ...state, history: [...state.history, path] };
        },
        popHistory(state) {
          return { ...state, history: state.history.slice(0, -1) };
        },
        addScreen(state, path: string, label: string, navigateTo: () => void) {
          const screenMap = new Map(state.screenMap);
          screenMap.set(path, { navigateTo, label });
          return {
            ...state,
            screenMap,
          };
        },
        removeScreen(state, path: string) {
          const screenMap = new Map(state.screenMap);
          screenMap.delete(path);
          return {
            ...state,
            screenMap,
          };
        },
      },
    }
  );

  const getCurrentScreen = () => {
    const value = stackData.get();
    return value.history[value.history.length - 1] ?? "";
  };

  const getLabel = (path: NavigationTarget<string>) => {
    const destination = typeof path === "object" ? path.$() : path;

    const screen = stackData.get().screenMap.get(destination);
    if (screen) {
      return screen.label;
    } else {
      return "";
    }
  };

  const navigate = (to: NavigationTarget) => {
    const destination = typeof to === "object" ? to.$() : to;
    const screen = stackData.get().screenMap.get(destination);

    if (screen) {
      stackData.pushHistory(destination);
      screen.navigateTo();
    } else {
      throw new Error(`Invalid path: ${destination}`);
    }
  };

  const goBack = () => {
    const history = stackData.get().history;
    const last = history[history.length - 1];
    if (last) {
      stackData.popHistory();
      const screen = stackData.get().screenMap.get(last);
      if (screen) {
        screen.navigateTo();
      } else {
        throw new Error(`Previous StackScreen has been detached: ${last}`);
      }
    }
  };

  const StackRoot = ({ children }: React.PropsWithChildren) => {
    const d = stackData.use();

    const registerScreen = React.useCallback(
      (path: string, label: string, navigateTo: () => void) => {
        if (!d.value.stackPaths.has(path)) {
          throw new Error(`Invalid path: ${path}`);
        }

        d.addScreen(path, label, navigateTo);
      },
      []
    );

    const detachScreen = React.useCallback((path: string) => {
      d.removeScreen(path);
    }, []);

    return (
      <StackContext.Provider
        value={{
          registerScreen,
          detachScreen,
          navigate,
          goBack,
          getLabel,
          currentScreen: getCurrentScreen(),
        }}
      >
        {children}
      </StackContext.Provider>
    );
  };

  const StackSwitch: (props: StackSwitchProps<string>) => JSX.Element = (
    props: any
  ) => {
    const { screens, wrapper, ...rest } = props;
    const { Stack, navigate } = useStack();

    const render = () => {
      return (
        <Stack {...rest}>
          {screens.map(
            (screen: StackSwitchProps<string>["screens"][number]) => (
              <StackScreenWrapper
                key={screen.uid}
                {...screen}
                navigate={navigate}
              />
            )
          )}
        </Stack>
      );
    };

    if (wrapper) {
      return wrapper(render());
    }

    return render();
  };

  return {
    StackRoot,
    StackSwitch,
    navigate,
    goBack,
    getLabel,
    get currentScreen() {
      return getCurrentScreen();
    },
  } as any;
};
