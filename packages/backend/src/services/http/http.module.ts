import { Module } from "@nestjs/common";

import { HttpService } from "src/services/http/http.service";

@Module({
  providers: [HttpService],
  exports: [HttpService],
})
export class HttpModule {}
