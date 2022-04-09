const fsp = require('fs').promises
const md5 = require('md5')


class User {
    constructor(log, email, db) {
        this.email = email
        this.hash = md5(this.email)
        this.log = log,
        this.db = db,
        this.id = this.getHash(),
        this.connectionDate = new Date(),
        this.cart = {}
    }
    getObjet() {
        const objet = {
            email : this.email,
            hash : this.hash,
            log : this.log,
            db : this.db,
            id : this.id,
            connectionDate : this.connectionDate,
            cart : this.cart
        }
        return objet
    }
    createCart() {
        this.cart = {
            hash: md5(`${this.email}${this.hash}`),
            db: [],
            creationDate: new Date()
        }
    }

    getHash() {
        const hash = this.db.length + 2
        let checkID = 0
        
        this.db.map((item) => {
            if(item.id == hash) {
                return checkID+=1
            }else { }
        })
        
        if(checkID==0){
            return hash
        } else{console.dir('error hash')}
        
    }



}

module.exports = User