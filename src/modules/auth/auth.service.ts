import { HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user";
import { SigninDto, SignupDto } from "./dtos";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async signUp(signUpDto: SignupDto): Promise<any> {
        const user = await this.userService.findOneByUsername(signUpDto.username)

        if (user) {
            throw new UnauthorizedException("Username already exists");
        }

        const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

        const newUser = await this.userService.createUser({
            ...signUpDto,
            password: hashedPassword,
        })
        const { password, ...userWithoutPassword } = newUser;
        return {
            code: HttpStatus.OK,
            message: "success",
            data: userWithoutPassword
        }
    }

    async signIn(signInDto: SigninDto): Promise<any> {
        const user = await this.userService.findOneByUsername(signInDto.username)

        if (!user) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(signInDto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const payload = { sub: user.id, id: user.id, username: user.username };

        return {
            code: HttpStatus.OK,
            message: "success",
            data: {
                access_token: this.jwtService.sign(payload)
            }
        }
    }

    async getUserProfile(userId: number): Promise<any> {
        const user = await this.userService.findOneById(userId);

        if (!user) {
            throw new UnauthorizedException();
        }
        return {
            code: HttpStatus.OK,
            message: "success",
            data: {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                isActive: user.isActive
            }
        }
    }
}