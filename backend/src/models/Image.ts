import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'

import Item from './Item'

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    path: string

    @OneToOne(() => Item, item => item.images)
    @JoinColumn({ name: 'item_id' })
    item: Item
}