import { Controller, Get, NotFoundException, Query, UseGuards } from "@nestjs/common";

import { UsersService } from "src/users/users.service";
import { userMapper } from "src/users/mappers/user.mapper";
import { KeycloakAuthGuard } from "src/auth/guards/keycloak.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(KeycloakAuthGuard)
  @Get("search")
  async findByEmail(@Query("email") email: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException("User not found.");
    }

    const data = userMapper.toSearchDto(user)

    return {
      message: "User fetched successfully.",
      data,
    };
  }
}
