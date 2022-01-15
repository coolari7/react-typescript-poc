// Inspiration: https://github.com/JedWatson/classnames
export function classnames(...args: any[]): string {
  const classes: any[] = [];

  let arg: any;
  for (let i = 0; i < args.length; i++) {
    arg = args[i];
    if (!arg) continue;
    if (typeof arg === "string") classes.push(arg);
    if (typeof arg === "object")
      Object.keys(arg).forEach((key) => arg[key] && classes.push(key));
  }

  return classes.join(" ");
}
