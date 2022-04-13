
const md5 = require('md5')


class User {
    constructor(log, email) {
        this.email = email
        this.hash = md5(this.email)
        this.log = log,
        this.connectionDate = new Date(),
        this.cart = []
        
    }
    getObjet() {
        const objet = {
            email : this.email,
            hash : this.hash,
            log : this.log,
            id : this.id,
            connectionDate : this.connectionDate,
            cart : this.cart,
        }
        return objet
    }
}

module.exports = User