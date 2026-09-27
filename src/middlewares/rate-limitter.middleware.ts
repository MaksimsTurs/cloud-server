import type { Request, Response, NextFunction } from "express";

import { isUndefined } from "@maksims/is.js";

import { HTTP429Error } from "../utils/HTTP-Error.util";

export type RateLimitterRequestRecord = Partial<Record<string, Record<string, RateLimitterRequestMetadata>>>;

export type RateLimitterOptions = {
  maxRequestsPerWindow: number
  windowInMs: number
  sendHeaders?: boolean
};

type RateLimitterRequestMetadata = {
  count: number
  resetIn: number
};

// TODO: Save metadata in memory/file.
const requests: RateLimitterRequestRecord = {};

export default function rateLimitter(options: RateLimitterOptions) {
  return function(req: Request, res: Response, next: NextFunction) {
    const ip: string = req.ip!;
    const route: string = req.url;
    const { maxRequestsPerWindow, windowInMs, sendHeaders } = options;
    
    if(!Object.hasOwn(requests, route)) {
      requests[route] = {};
    }

    if((!Object.hasOwn(requests[route] || {}, ip) && isUndefined(requests[route]![ip])) || 
       (Object.hasOwn(requests[route] || {}, ip) && shouldResetRateCount(requests[route]![ip]))) {
      requests[route]![ip] = { 
        count: 0,
        resetIn: Date.now() + windowInMs
      };
    } else if(requests[route]![ip]!.count >= maxRequestsPerWindow) {
      throw new HTTP429Error(`Unknown user ${req.socket.remoteAddress} has reached request limit on path ${req.path}`);
    }

    if(sendHeaders && requests[route]![ip]) {
      res.header("X-RateLimit-Limit", maxRequestsPerWindow.toString());
      res.header("X-RateLimit-Remaining", (maxRequestsPerWindow - requests[route]![ip].count).toString());
      res.header("Retry-After", (requests[route]![ip].resetIn - Date.now()).toString());
    }

    requests[route]![ip].count++;
    next();
  };
};

function shouldResetRateCount(metadata: RateLimitterRequestMetadata): boolean {
  const { resetIn } = metadata;
  return Date.now() >= resetIn;
};
