import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'messages' })
export class MessageEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('character varying')
  message: string;

  @Column('character varying')
  username: string;

  @CreateDateColumn()
  created_at: Date;
}
