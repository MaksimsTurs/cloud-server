import Logger from "../utils/Logger.js/src/Logger";

type LoggingModes = "dev" | "prod";

export default function createLogger(): Logger<LoggingModes> {
  return new Logger<LoggingModes>({
    mode: process.env.MODE as LoggingModes,
    styling: {
      colors: {
        info: Logger.colorizer.font().rgb(70, 135, 255)
      }
    }
  });
};
