import { Body, Controller, Post, Req } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { WorkspaceService } from "./workspace.service";
import { CreateWorkspaceDto } from "./dtos/create-workspace";

@ApiBearerAuth()
@Controller("workspace")
export class WorkspaceController {
    constructor(
        private readonly workspaceService: WorkspaceService,
    ) { }

    @Post()
    async createWorkspace(@Body() createWorkspaceDto: CreateWorkspaceDto, @Req() req: Request): Promise<any> {
        const userId = req['user']?.sub ?? req['user']?.id;
        return await this.workspaceService.createWorkspace(createWorkspaceDto, userId);
    }
}