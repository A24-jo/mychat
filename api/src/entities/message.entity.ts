import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn   
} from "typeorm";

@Entity("message")
export class MessageEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    message: string;

    @Column("varchar")
    sender: string;

    @Column("varchar")
    receiver: string;

    @Column("varchar")
    status: string;

    @Column("varchar")
    type: string;

    @CreateDateColumn()
    createAt:Date;

    @UpdateDateColumn()
    updateAt:Date;
}