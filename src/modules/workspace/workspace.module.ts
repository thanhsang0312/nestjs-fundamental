import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "../user";
import { WorkspaceService } from "./workspace.service";
import { Workspace } from "src/entities";
import { WorkspaceController } from "./workspace.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Workspace]), UserModule],
    controllers: [WorkspaceController],
    providers: [WorkspaceService],
    exports: [WorkspaceService],
})
export class WorkspaceModule { }
