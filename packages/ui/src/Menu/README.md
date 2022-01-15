# Notes

## Things of importance:

1. scroll lock
2. overlay
3. getBoundClientRect
4. Flexible Compound Components

## Revelations

1. `as?: keyof JSX.IntrinsixElements` and `React.cloneElement` could be alternatives in some usecases.

## Polymorphic Components

Magic happens with:

1. `React.ElementType`
2. `React.ComponentPropsWithRef`
3. `Omit<>`

Takes care of builtin tags (such as <a></a>) as well as custom components (such as <Link />).

Cons:

1. Intellisense slows down.
