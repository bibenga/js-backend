import {
  Column, Entity, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent,
} from "typeorm";

@Entity()
@Tree("materialized-path")
export class Category {
  // @PrimaryGeneratedColumn()
  // id: number
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @TreeParent({onDelete: "CASCADE"})
  parent: Category;

  @TreeChildren()
  children: Category[];
}
