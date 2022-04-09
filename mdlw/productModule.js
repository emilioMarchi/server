const fs = require('fs');
const fsp = fs.promises;

class Products {
    constructor() {
        this.db = []
    }
    
    getForId(id) {
        const item = this.db.filter(item => id == item.id)
        return item[0]
    }
    
    async getData() {
        this.db = []
        const data = await fsp.readFile('./products.json', 'utf8')
        const dataParse = JSON.parse(data);
        
        dataParse.map(item => this.db.push(item))
        return this.db
    }
    getProducts() {
        const products = this.db
        return products
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
    async addProduct (data) {
        this.db.push(data)
        await fsp.writeFile('./products.json', JSON.stringify(this.db))
    }
}

const productMlw = new Products()
productMlw.getData()

module.exports = productMlw