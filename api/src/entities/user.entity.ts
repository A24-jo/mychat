import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
} from "typeorm";

@Entity("user")
export class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    userId: string;

    @Column("varchar")
    name: string;

    @Column("varchar",{nullable:true})
    avatar: string;

    @Column("varchar",{nullable:true})
    phone: string;

    @Column("varchar")
    email: string;

    @Column("varchar")
    password?: string;

    @Column("varchar")
    avatarcolor?: string;

    @Column("varchar",{default:false})
    active: boolean;

    @Column({ type: 'json', nullable: false })
    friends: string[] = [];

    @Column("varchar",{default:"0"})
    notifications: string;

    @Column("varchar",{ nullable: true })
    dni: string;

    @Column("varchar",{ nullable: true })
    apellidomaterno: string;

    @Column("varchar",{ nullable: true })
    apellidopaterno: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}