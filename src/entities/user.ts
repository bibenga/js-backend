import {
  Entity, Column, PrimaryGeneratedColumn, VersionColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn,
  Index, OneToOne, VirtualColumn,
} from "typeorm";
import { Profile } from "./profile";

@Entity({ orderBy: { id: "ASC" } })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "username", comment: "User login" })
  @Index({
    unique: true,
    where: "deleted IS NULL",
  })
  username: string;

  @Column({ name: "first_name", nullable: true })
  firstName: string;

  @Column({ name: "last_name", nullable: true })
  lastName: string;

  @Column({ name: "is_active", default: true })
  isActive: boolean;

  // @CreateDateColumn({ type: "timestamptz" })
  @CreateDateColumn()
  created: Date;

  // @UpdateDateColumn({ type: "timestamptz" })
  @UpdateDateColumn()
  updated: Date;

  // @DeleteDateColumn({ type: "timestamptz" })
  @DeleteDateColumn()
  deleted?: Date;

  @VersionColumn({ default: 1 })
  version: Number;

  // @Column({ type: "jsonb", default: {} })
  // meta: { ip: string };

  @OneToOne(() => Profile, (profile) => profile.user) // specify inverse side as a second parameter
  profile: Profile;

  @VirtualColumn({
    query: alias => `EXISTS(select * from "profile" WHERE "user_id" = ${alias}.id)`,
  })
  isProfileExists: boolean;

  @Column({ default: 1 })
  age: Number;

  @Column({ select: false })
  password: string;
}
