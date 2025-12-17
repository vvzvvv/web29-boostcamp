import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Solution } from './solution.entity';

enum ProblemType {
  SINARIO = 'sinario',
  UNIT = 'unit',
  CHEETSHEET = 'cheetsheet',
}

@Entity('problem')
export class Problem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  solution_id: number;

  @Column({ type: 'enum', enum: ProblemType })
  problem_type: ProblemType;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => Solution)
  @JoinColumn({ name: 'solution_id' })
  solution: Solution;
}
