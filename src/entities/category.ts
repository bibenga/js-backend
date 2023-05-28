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

  @TreeChildren()
  children: Category[];

  @TreeParent()
  parent: Category;
}
