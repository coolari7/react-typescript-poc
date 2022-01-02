export type GetHTMLElement<
  T extends keyof JSX.IntrinsicElements
> = JSX.IntrinsicElements[T] extends React.DetailedHTMLProps<infer P, infer Q>
  ? Q
  : JSX.IntrinsicElements[T] extends React.SVGProps<infer R>
  ? R
  : T;
