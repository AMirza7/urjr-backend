// src/utils/logger.ts
import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize } = format;

const logger = createLogger({
  level: 'info',
  format: combine(
    colorize(),
    timestamp(),
    printf(({ level, message, timestamp, ...meta }) => {
      const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : '';
      return `[${timestamp}] ${level}: ${message} ${metaStr}`;
    })
  ),
  transports: [new transports.Console()],
});

export default logger;
