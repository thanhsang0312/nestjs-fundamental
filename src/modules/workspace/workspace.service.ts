import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Workspace } from "src/entities";
import { CreateWorkspaceDto } from "./dtos/create-workspace";
import { UserService } from "../user";

@Injectable()
export class WorkspaceService {
    constructor(
        @InjectRepository(Workspace) private readonly workspaceRepository: Repository<Workspace>,
        private readonly userService: UserService,
    ) { }

    async createWorkspace(createWorkspaceDto: CreateWorkspaceDto, userId: number): Promise<any> {
        const { name } = createWorkspaceDto
        const existingWorkspace = await this.workspaceRepository.findOne({ where: { name: createWorkspaceDto.name } })

        if (existingWorkspace) {
            throw new HttpException("Workspace already exists", HttpStatus.BAD_REQUEST)
        }

        const owner = await this.userService.findOneById(userId);
        if (!owner) {
            throw new HttpException("Owner not found", HttpStatus.NOT_FOUND);
        }
        const newWorkspace = await this.workspaceRepository.create({
            ...createWorkspaceDto,
            current_members: 1,
            members: [{ user: owner, role: "ADMIN" }]
        })

        await this.workspaceRepository.save(newWorkspace);

        return {
            code: HttpStatus.OK,
            message: "success",
            data: newWorkspace
        }
    }
}