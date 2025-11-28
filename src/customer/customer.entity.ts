import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 150 })
  fullName: string;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @BeforeInsert()
  generateId() {
    this.id = `USR-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  }
}
