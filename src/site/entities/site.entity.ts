import { CustomBaseEntity } from '../../common/entity/custom-base.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../../users/entities/user.entity';

@Entity('site', { schema: 'public' })
export class Site extends CustomBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({
    unique: true,
  })
  title: string;

  @Column()
  url: string;

  @Column({
    name: 'is_active',
    default: true,
  })
  isActive: boolean;

  @Column()
  description: string;

  @ManyToOne(() => Users, (user) => user.sites)
  userId: Users;
}
