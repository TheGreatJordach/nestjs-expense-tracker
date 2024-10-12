import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../../users/entity/user.entity";
import { ExpenseCategoryEnum } from "../enum/expense.category.enum";

@Entity("expenses")
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "bigint" }) // Use bigint for amount stored in minor units (e.g., cents)
  amount: number;
  @Column({ type: "varchar", length: 3 }) // Store currency as a 3-letter code (ISO 4217)
  currency: string;
  @Column({
    type: "enum",
    enum: ExpenseCategoryEnum,
    default: ExpenseCategoryEnum.OTHERS,
  })
  category: ExpenseCategoryEnum;
  @Column()
  description: string;
  @Column({ type: Date })
  date: Date;
  @ManyToOne(() => User, (user) => user.expenses)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
