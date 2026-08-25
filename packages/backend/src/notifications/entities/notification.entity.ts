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
import { NotificationTypes } from "../notifications.type";

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
    enum: NotificationTypes,
    default: NotificationTypes.default,
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
