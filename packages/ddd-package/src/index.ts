import type { Context } from "./infra/context";
import * as usecases from "./usecases";

export const createPackageTemplate = (ctx: Context) => {
  return {
    getExample: usecases.getExample(ctx),
    createExample: usecases.createExample(ctx),
  };
};

export default createPackageTemplate;
