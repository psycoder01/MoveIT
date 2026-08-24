import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { InvitationStatus } from "../types";

@Entity("invitations")
export class Invitation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: InvitationStatus,
    default: "pending",
  })
  status: string;

  @Column("uuid")
  organization_id: string;

  @Column("uuid")
  user_id: string;

  @ManyToOne(() => User, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: "user_id" })
  userId: User;

  @Column("uuid")
  created_by: string;

  @ManyToOne(() => User, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: "created_by" })
  createdBy: User;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;
}
