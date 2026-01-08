import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Problem } from './problem.entity';

@Entity('solution')
export class Solution {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  config_type: string;

  @Column({ type: 'json' })
  config_info: object;

  @OneToOne(() => Problem, (problem) => problem.solution)
  @JoinColumn({ name: 'problem_id' })
  problem: Problem;
}
