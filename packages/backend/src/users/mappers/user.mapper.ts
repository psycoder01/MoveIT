import { User } from "src/users/entities/user.entity";
import { UserDto } from "src/users/dto/users.dto";

export const userMapper = {
    toSearchDto: (user: User): UserDto => ({
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.full_name,
        avatarUrl: user.avatar_url,
        timezone: user.timezone,
    })
}