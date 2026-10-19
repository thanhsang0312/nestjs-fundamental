import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Workspace {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    current_members: number

    @Column({ type: 'jsonb' })
    members: any

    @Column()
    is_private: boolean
}