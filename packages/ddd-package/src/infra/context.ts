export interface Context {
  logger: unknown;

  config: {
    environment: string;
  };
}

export const createContext = (params: {
  logger?: Context["logger"];
  config?: Partial<Context["config"]>;
}): Context => {
  const logger = params.logger;
  const config: Context["config"] = {
    environment: process.env.NODE_ENV || "development",
  };

  return {
    logger,
    config,
  };
};
