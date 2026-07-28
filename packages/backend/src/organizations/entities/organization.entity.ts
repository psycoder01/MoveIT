import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
} from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity("organizations")
export class Organization {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ nullable: true })
  logo_url: string;

  @Column({
    type: "enum",
    enum: ["free", "basic", "pro", "enterprise"],
    default: "free",
  })
  plan: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ type: "uuid" })
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
