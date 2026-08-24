import { SessionUserDto } from "src/auth/dto/session.dto";
import { AuthUser } from "src/auth/types/auth.types";

export const sessionMapper = {
    toSessionDto: (user: AuthUser): SessionUserDto => ({ id: user.id, fullName: user.full_name, email: user.email, username: user.username })
}