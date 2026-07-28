import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("notifications")
export class Notification {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  user_id: string;

  @Column("uuid")
  reference_id: string;

  @Column({
    type: "enum",
    enum: ["default", "invitation"],
    default: "default",
  })
  type: string;

  @Column()
  title: string;

  @Column({ type: "text", nullable: true })
  message: string;

  @Column({ default: true })
  is_read: boolean;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date;
}
