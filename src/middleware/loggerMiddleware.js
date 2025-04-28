import fs from "fs";
import winston from "winston";
let filesystem = fs.promises;

// async function Logger(logdata) {
//   logdata = `\n ${new Date().toString()}-logData-${logdata}`;
//   try {
//     await filesystem.appendFile("log.txt", logdata);
//   } catch (error) {
//     console.log(error);
//   }
// }
let logger = winston.createLogger({
  level: "info",
  defaultMeta: { service: "request logging" },
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: "log.txt" })],
});
export default async function LoggerMiddleware(req, res, next) {
  let logdata = `${JSON.stringify(req.url)}-${JSON.stringify(req.body)}`;
  //  await Logger(logdata);
  logger.info(logdata);

  next();
}
