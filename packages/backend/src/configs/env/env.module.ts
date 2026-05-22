import { ConfigModule } from "@nestjs/config";

import envConfig from "./env.config";

export default ConfigModule.forRoot({
  envFilePath: `.env.${process.env.NODE_ENV}`,
  load: [envConfig],
  isGlobal: true,
});
