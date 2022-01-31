import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('users_pkey', ['id'], { unique: true })
@Index('users_username_key', ['username'], { unique: true })
@Entity('users', { schema: 'public' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id?: number;

  @Column('character varying', {
    name: 'username',
    nullable: true,
    unique: true,
    length: 255,
  })
  username: string | null;

  @Column('character varying', {
    name: 'password',
    nullable: true,
    length: 255,
  })
  password?: string | null;

  @Column('character varying', { name: 'email', nullable: true, length: 255 })
  email?: string | null;

  @Column('character varying', {
    name: 'first_name',
    nullable: true,
    length: 255,
  })
  firstName?: string | null;

  @Column('character varying', { name: 'family', nullable: true, length: 255 })
  family?: string | null;

  @Column('timestamp without time zone', { name: 'created_on' })
  createdOn?: Date;

  @Column('boolean', { name: 'is_registered', nullable: true })
  isRegistered?: boolean | null;

  @Column('character varying', { name: 'mobile', nullable: true, length: 255 })
  mobile?: string | null;
}
