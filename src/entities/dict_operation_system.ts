import {
  Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Index, VirtualColumn,
  PrimaryColumn,
} from "typeorm";

@Entity({ orderBy: { name: "ASC" } })
export class DictOperationSystem {
  @PrimaryColumn({
    type: "smallint",
    primaryKeyConstraintName: "pk_dict_speration_system",
  })
  id: number;

  @Column({ nullable: false, comment: "Operation system name" })
  @Index("u_dict_speration_system", { unique: true, /*where: "deleted IS NULL"*/ })
  name!: string;

  @Column({ default: "" })
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

  @VirtualColumn({ query: alias => `${alias}.deleted IS NULL` })
  isActive: boolean;

  // @VersionColumn({ default: 1 })
  // version: Number;
}
