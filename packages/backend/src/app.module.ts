import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { Module } from "@nestjs/common";

import envModule from "src/configs/env/env.module";
import { DatabaseModule } from "src/database/database.module";

import { AuthModule } from "src/auth/auth.module";
import { UsersModule } from "src/users/users.module";
import { OrganizationsModule } from "src/organizations/organizations.module";
import { ResponseInterceptor } from "src/interceptors/response";
import { AllExceptionsFilter } from "src/interceptors/errorResponse";

@Module({
  imports: [
    envModule,
    DatabaseModule,
    AuthModule,
    OrganizationsModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
