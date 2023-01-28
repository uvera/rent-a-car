// WARNING: This is not a drop in replacement solution and
// it might not work for some edge cases. Test your code!
const uniqBy = <T, R>(arr: Array<T>, iteratee: string | ((e: T) => R)) => {
  if (typeof iteratee === "string") {
    const prop = iteratee;
    iteratee = (item) => item[prop];
  }

  const iter = iteratee satisfies (e: T) => R;

  return arr.filter(
    (x, i, self) => i === self.findIndex((y) => iter(x) === iter(y))
  );
};

export default uniqBy;
