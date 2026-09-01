import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { NotificationType } from "../types/notification.types";

@Entity("notifications")
export class Notification {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  user_id: string;

  @ManyToOne(() => User, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: "user_id" })
  userId: User;

  @Column("uuid")
  reference_id: string;

  @Column({
    type: "enum",
    enum: NotificationType,
    default: NotificationType.DEFAULT,
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
