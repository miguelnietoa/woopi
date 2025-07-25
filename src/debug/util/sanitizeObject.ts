import { isEmptyObject } from "./isEmptyObject";
import { AnyObject } from "../types/types";

export const sanitizeObject = <T extends AnyObject>(
  obj: T,
  noEmptyObj = false,
) => {
  return Object.keys(obj).reduce((res, param) => {
    const paramValue = obj[param];

    const emptyObj = noEmptyObj && isEmptyObject(paramValue as AnyObject);

    if (paramValue && !emptyObj) {
      return { ...res, [param]: paramValue };
    }

    return res;
  }, {} as T);
};
