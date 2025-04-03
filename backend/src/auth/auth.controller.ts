import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Post("signup")
  async signup(@Body() body: { name: string; email: string; password: string }) {
    return this.usersService.createUser(body.name, body.email, body.password);
  }

  @Post("login")
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.login(user);
  }
}
