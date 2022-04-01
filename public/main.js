let socket = io()

socket.on('server:loadProducts', addListProducts)

const form = document.querySelector("#noteForm")
form.addEventListener('submit', (e)=>{
    e.preventDefault()
    
    const title = document.querySelector("#title").value
    const description = document.querySelector("#description").value
    const price = document.querySelector("#price").value
    
    const product = {
        title,
        description,
        price
    }
    
    socket.emit('client:newProduct', product)
    
    form.reset()
})