import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SigninDto, SignupDto } from "./dtos";
import { Public } from "./decorators/public.decorator";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Public()
    @Post("sign-up")
    @HttpCode(HttpStatus.CREATED)
    async signUp(@Body() signUpDto: SignupDto): Promise<any> {
        return await this.authService.signUp(signUpDto)
    }

    @Public()
    @Post("sign-in")
    @HttpCode(HttpStatus.OK)
    async signIn(@Body() signInDto: SigninDto): Promise<any> {
        return await this.authService.signIn(signInDto)
    }
}