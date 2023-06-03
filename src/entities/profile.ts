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

  @Column({ name: "first_name", nullable: true })
  firstName: string;

  @Column({ name: "last_name", nullable: true })
  lastName: string;

  @RelationId((profile: Profile) => profile.user)
  userId: string;

  @Column({ default: 1 })
  age: Number;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  photo: string;

  @UpdateDateColumn()
  updated: Date;

  @VersionColumn({ default: 1 })
  version: Number;
}
