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
import { Organization } from "./organization.entity";
import { OrganizationMemberRole } from "../types/organization.types";

@Entity("organization_members")
export class OrganizationMember {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid" })
  organization_id: string;

  @Column({ type: "uuid" })
  user_id: string;

  @Column({
    type: "enum",
    enum: OrganizationMemberRole,
    default: OrganizationMemberRole.member,
  })
  role: string;

  @ManyToOne(() => Organization, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: "organization_id" })
  organization: Organization;

  @ManyToOne(() => User, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;
}
