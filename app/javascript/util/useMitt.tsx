import mitt, { Emitter } from "mitt";

export const useMitt = <T extends Record<string, unknown>>() => {
  if (!window["mitt"]?.["signature"]) {
    const instance = mitt<T>();
    window["mitt"] = { signature: true, instance };
    return instance as Emitter<T>;
  }
  return window["mitt"].instance as Emitter<T>;
};

export default useMitt;
