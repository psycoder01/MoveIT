import { Controller, Get, NotFoundException, Query } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("search")
  async findByEmail(@Query("email") email: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException("User not found.");
    }

    return {
      message: "User fetched successfully.",
      data: {
        id: user.id,
        email: user.email,
        username: user.username,
        full_name: user.full_name,
        avatar_url: user.avatar_url,
        timezone: user.timezone,
        is_active: user.is_active,
        last_login_at: user.last_login_at,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    };
  }
}
