const fsp = require('fs').promises
const md5 = require('md5')

class UsersControler {
    constructor () {
        this.db = []
    }

    createCart = (user) => {user.cart.push({
        hash: md5(`${this.email}${this.hash}`),
        db: [],
        creationDate: new Date()
    })}

    async checkUsers(x) {
        const email = x

        const user = await this.getUser(email)
        
         if(user == undefined){
             return false
         } else {return true}
    }

    async getUser(x) {
        const email = x
        
        if(this.db.length !== 0) {
            const user = this.db.find((item) => {
                return item.email === email 
            })
            return user
        }
        else {
            return undefined
        }
    }

    async getData() {
        await this.db.pop()
        const data = await fsp.readFile('./users.json', 'utf8')
        const dataParse = JSON.parse(data);
        
        dataParse.map(item => this.db.push(item))
        return this.db
    }

    async addUser(data) {
        try{
            this.db.push(data)
            await fsp.writeFile('./users.json', JSON.stringify(this.db))
            return {state:'satisfactory', msj: 'user create' }
        }
        catch{
            return {state:'negative'}
        }
    }
}

const usersControler = new UsersControler()
usersControler.getData()
module.exports = usersControler