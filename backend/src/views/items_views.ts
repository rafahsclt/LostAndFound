import Item from '../models/Item'
import images_views from './images_views'
import categories_views from './categories_views'

function render(item: Item) {
    return {
        id: item.id,
        name: item.name,
        telephone: item.telephone,
        object: item.object,
        latitude: item.latitude,
        longitude: item.longitude,
        observations: item.observations,
        category: item.category,
        images: images_views.renderMany(item.images)
    }
}

function renderMany(items: Item[]) {
    return items.map(item => render(item))
}

export default { render, renderMany }