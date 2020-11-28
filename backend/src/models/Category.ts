import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany } from 'typeorm'

import Item from './Item'

@Entity('categories')
export default class Category {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @OneToMany(() => Item, item => item.category, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'category_id' })
    item: Item[]
}