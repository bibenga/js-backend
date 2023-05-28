import {
  Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, VersionColumn, JoinColumn,
  OneToOne, RelationId,
} from "typeorm";
import { User } from "./user";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => User, user => user.profile, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: User;

  @RelationId((profile: Profile) => profile.user)
  userId: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  photo: string;

  @UpdateDateColumn()
  updated: Date;

  @VersionColumn({ default: 1 })
  version: Number;
}
