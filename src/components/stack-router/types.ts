import type React from "react";
import type { StackSwitchProps } from "./screen-wrapper";
import type {
  AsString,
  ConcatPath,
  StackTree,
  StackTreeNodeMethods,
} from "./stack-tree";

type SafeUnion<A, B> = [never] extends B ? A : A | B;

type ValuesOf<T> = T[keyof T];

export type CollectNodePaths<
  T extends StackTree<any, any>,
  P extends string = ""
> = SafeUnion<
  ValuesOf<{
    [K in keyof T as T[K] extends StackTreeNodeMethods<any>
      ? K
      : never]: ConcatPath<P, AsString<K>>;
  }>,
  ValuesOf<{
    [K in keyof T as T[K] extends StackTreeNodeMethods<any>
      ? K
      : never]: CollectNodePaths<T[K], ConcatPath<P, AsString<K>>>;
  }>
>;

export type NavigationTarget<P extends string = string> = P | { $(): P };

export type CreateStackResult<T extends StackTree<any, any>> = {
  StackRoot: (props: React.PropsWithChildren) => JSX.Element;
  StackSwitch: (props: StackSwitchProps<CollectNodePaths<T>>) => JSX.Element;
  getLabel: (path: NavigationTarget<CollectNodePaths<T>>) => string;
  navigate: (path: NavigationTarget<CollectNodePaths<T>>) => void;
  goBack: () => void;
  currentScreen: string;
};
