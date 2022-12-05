import type { StackTree } from "./stack-tree";

export const collectNodePaths = <T extends StackTree<any, any>>(
  tree: T
): Array<string> => {
  const paths = Object.keys(tree).map((key) => {
    const node = tree[key]!;
    const childPaths = (collectNodePaths as any)(node) as string[];
    return childPaths.length > 0
      ? [key].concat(childPaths.map((path) => `${key}/${path}`))
      : key;
  });
  return paths.flat(999) as any;
};
