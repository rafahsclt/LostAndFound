import Image from '../models/Image'

function render(image: Image) {
    return {
        id: image.id,
        url: `http://localhost:3333/uploads/${image.path}`
    }
}

function renderMany(images: Image[]) {
    return images.map(image => render(image))
}


export default { render, renderMany }