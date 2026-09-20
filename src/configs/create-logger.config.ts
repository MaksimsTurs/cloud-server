import type { ApplicationConf, ApplicationModes } from "../Application.type";

import Logger from "@maksims/logger.js";

export default function createLogger(conf: ApplicationConf): Logger<ApplicationModes> {
  return new Logger<ApplicationModes>({
    mode: conf.MODE as ApplicationModes,
    styles: {
      colors: {
        info: Logger.colorizer().font().rgb(70, 135, 255),
        warn: Logger.colorizer().font().rgb(150, 150, 100),
        error: Logger.colorizer().font().rgb(150, 50, 50)
      }
    }
  });
};
