import http from "http";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import bodyParser from "body-parser";
import * as exp_err from "express-async-errors";
// import babelregister from 'babel-core/renpgister';
import babelpolyfill from "babel-polyfill";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";



import api from "./api";
import initializeDb from "./db";
import apiConfig from "./config/api";
import { logger } from "./lib/utils";

let app = express();
app.server = http.createServer(app);

// 3rd party middleware
// app.use(cors({
//     exposedHeaders: apiConfig.corsHeaders
// }));
app.use(cors());

app.use(helmet());

app.use(
  bodyParser.json({
    limit: apiConfig.bodyLimit,
  })
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
); // for parsing application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use("/static", express.static(path.join(__dirname, "public")));

app.use(morgan("combined"));

initializeDb(() => {
  // api specs
  app.use(apiConfig.specs, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // api router
  app.use(apiConfig.prefix, api());

  app.server.listen(process.env.PORT || apiConfig.port);

  logger.info(`Started on PORT ${app.server.address().port}...`);
});

app.get("/err", function (req, res) {
  throw new Error("BROKEN");
});

app.use(function (req, res, next) {
  res.status(404).json({
    status: "error",
    data: {
      status: "error",
      message: "Endpoint not found!",
    },
  });
});
app.use(function (err, req, res, next) {
  logger.info(err.stack);
  res.status(500).json({
    status: "error",
    data: {
      status: "error",
      message: "Something broke",
    },
  });
});
export default app;
require('./ws');
