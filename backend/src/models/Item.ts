import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm'

import Image from './Image'
import Category from './Category'

@Entity('items')
export default class Item {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @Column()
    telephone: string

    @Column()
    object: string

    @Column()
    lostOrFound: string

    @Column()
    latitude: number

    @Column()
    longitude: number

    @Column()
    observations: string

    @Column()
    category_id: number

    @OneToMany(() => Image, images => images.item, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'item_id' })
    images: Image[]

    @ManyToOne(() => Category, category => category.items, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'category_id' })
    category: Category
}