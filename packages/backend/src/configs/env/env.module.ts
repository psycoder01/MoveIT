import { ConfigModule } from "@nestjs/config";

import envConfig from "src/configs/env/env.config";

export default ConfigModule.forRoot({
  envFilePath: `.env.${process.env.NODE_ENV}`,
  load: [envConfig],
  isGlobal: true,
});
