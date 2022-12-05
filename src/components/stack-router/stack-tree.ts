export type AsString<S> = S extends string ? S : "";

export type ConcatPath<A extends string, B extends string> = A extends ""
  ? B
  : `${A}/${B}`;

export type StackTreeNode = {
  [key: string]: Readonly<StackTreeNode>;
};

export type RouteTreeRoot = Readonly<Record<string, StackTreeNode>>;

export type PathGetterOptions = {
  relative?: boolean;
  locationHash?: string;
};

export type StackTreeNodeMethods<P extends string> = {
  /**
   * Getter function that returns the full path to the specified
   * Route.
   */
  $(): P;
  /**
   * Getter function that returns the full path to the specified
   * Route.
   */
  toString(): string;
};

export type StackTree<S, P extends string> = {
  [K in keyof S]: StackTree<S[K], ConcatPath<P, AsString<K>>> &
    StackTreeNodeMethods<ConcatPath<P, AsString<K>>>;
};

export const ROUTE_NAME = Symbol("ROUTE_NAME");

const RouteProxyFor = <S extends StackTreeNode>(
  route: S,
  parents: string[] = []
): StackTree<S, ""> => {
  const getPath = (v?: string) => (v ? [...parents, v] : parents).join("/");

  return new Proxy(route, {
    get(_, routeKey: string) {
      let name = "";

      if (
        typeof route[routeKey] === "object" &&
        ROUTE_NAME in route[routeKey]!
      ) {
        // @ts-ignore
        name = route[routeKey][ROUTE_NAME];
      } else {
        name = routeKey;
      }

      if (routeKey === "$") {
        return () => getPath();
      }

      if (routeKey === "toString") {
        return () => getPath();
      }

      if (routeKey in route) {
        return RouteProxyFor(route[routeKey]!, [...parents, name]);
      }
    },
    set() {
      throw new Error("Cannot assign a value on a readonly object.");
    },
  }) as any;
};

export const createStackTree = <R extends RouteTreeRoot>(root: R) =>
  RouteProxyFor(root);
