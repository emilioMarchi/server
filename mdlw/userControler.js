const fsp = require('fs').promises

class UsersControler {
    constructor() {
        this.db = []
    }

    async getData() {
        
        const data = await fsp.readFile('./users.json', 'utf8')
        const dataParse = JSON.parse(data);
        
        dataParse.map(item => this.db.push(item))
    }

    async addUser(data) {
        this.db.push(data)
        await fsp.writeFile('./users.json', JSON.stringify(this.db))
        return this.db
    }
}

const usersControler = new UsersControler()
usersControler.getData()


module.exports = usersControler