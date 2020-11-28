import Image from '../models/Image'

function render(image: Image) {
    return {
        id: image.id,
        url: `http://localhost:3333/uploads/${image.path}`
    }
}

function renderMany(items: Image[]) {
    return items.map(item => render(item))
}

export default { render, renderMany }