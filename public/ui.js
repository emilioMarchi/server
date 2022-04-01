const cardsContainer = document.querySelector('.cards-container')

const addListProducts = (data) => {
    cardsContainer.innerHTML = ''
    data.map((item) => {
        const div = document.createElement('div')
        const inner = (data) => {
            div.innerHTML = `
                <div class='card-product' id='${data.id}'>
                    <h2>${data.title}</h2>
                    <h3>${data.description}</h3>
                    <h3>${data.price}</h3>
                </div>`
        }
        inner(item)
        cardsContainer.append(div)
    })
}

