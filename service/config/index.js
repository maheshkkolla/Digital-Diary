import * as devConfig from "./dev.json";


let env = process.env.ENV ? process.env.ENV : "dev";

let config;

switch(env) {
  default: {
    config = devConfig;
    break;
  }
}

export default config;