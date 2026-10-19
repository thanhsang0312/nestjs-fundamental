import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }

    async findOneById(id: number): Promise<User | null> {
        return await this.userRepository.findOne({ where: { id } })
    }

    async findOneByUsername(username: string): Promise<User | null> {
        return await this.userRepository.findOne({ where: { username } })
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return await this.userRepository.save(createUserDto)
    }
}