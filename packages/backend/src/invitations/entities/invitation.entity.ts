import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("invitations")
export class Invitation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: ["pending", "accepted", "declined", "expired"],
    default: "pending",
  })
  status: string;

  @Column("uuid")
  organization_id: string;

  @Column("uuid")
  user_id: string;

  @Column("uuid")
  created_by: string;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;
}
