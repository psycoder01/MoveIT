import { Controller, Get, NotFoundException, Query } from "@nestjs/common";

import { UsersService } from "src/users/users.service";
import { userMapper } from "src/users/mappers/user.mapper";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
