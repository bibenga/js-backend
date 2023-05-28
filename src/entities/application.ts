import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn,
  Index, VirtualColumn, JoinColumn, ManyToOne,
} from "typeorm";
import { DictOperationSystem } from "./dict_operation_system";

@Entity({ orderBy: { name: "ASC" } })
@Index("u_application", ["dictOperationSystem", "name"], {
  unique: true,
  // where: "deleted IS NULL",
})
export class Application {
  // @PrimaryGeneratedColumn("uuid")
  // id: string;
  @PrimaryGeneratedColumn("identity", {
    type: "int8",
    primaryKeyConstraintName: "pk_application",
  })
  id: Number;

  @ManyToOne(() => DictOperationSystem, {
    nullable: false,
    onDelete: "RESTRICT",
  })
  @JoinColumn({
    name: "dict_speration_system_id",
    foreignKeyConstraintName: "fk_dict_speration_system",
  })
  dictOperationSystem!: DictOperationSystem;

  @Column({ name: "name", comment: "Application name" })
  name!: string;

  @Column({ name: "display_name", default: "" })
  displayName: string;

  // @CreateDateColumn({ type: "timestamptz" })
  @CreateDateColumn()
  created: Date;

  // @UpdateDateColumn({ type: "timestamptz" })
  @UpdateDateColumn()
  updated: Date;

  // @DeleteDateColumn({ type: "timestamptz" })
  @DeleteDateColumn()
  deleted?: Date;

  @VirtualColumn({ query: (alias) => `${alias}.deleted IS NULL` })
  isActive: boolean;

  // @VersionColumn({ default: 1 })
  // version: Number;
}
