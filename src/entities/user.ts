import {
  Entity, Column, PrimaryGeneratedColumn, VersionColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn,
  Index, OneToOne, VirtualColumn, BaseEntity,
} from "typeorm";
import {
  IsEmail,
} from "class-validator"
import { Profile } from "./profile";

@Entity({ orderBy: { id: "ASC" } })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "email", comment: "User login" })
  @Index({
    unique: true,
    where: "deleted IS NULL",
  })
  @IsEmail()
  email: string;

  @Column({ select: false })
  password: string;

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
    type: "boolean",
    query: alias => `EXISTS(select * from "profile" WHERE "user_id" = ${alias}.id)`,
  })
  isProfileExists: boolean;
}
