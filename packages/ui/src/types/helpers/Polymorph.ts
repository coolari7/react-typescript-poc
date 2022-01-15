// Inspirtation: https://isamatov.com/polymorphic-components-react-typescript/

import { ComponentPropsWithRef, ElementType } from "react";

type As<P, E extends ElementType> = P & {
  as?: E;
};
type AsWithProps<P, E extends ElementType, X extends string> = As<P, E> &
  Omit<ComponentPropsWithRef<E>, X | keyof As<P, E>>;

export type Polymorph<P, E extends ElementType, X extends string = ""> = P &
  AsWithProps<P, E, X>;
