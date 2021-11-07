const conn = require('../module/connection');
const config = require('../config/config');

class Model {
    constructor(name, data) {
				this.data = data;
        return this.connection().model(name, data.schema);
    }

    async connection() {
        if (this.data.connection) {
            return conn.createConnect(this.data.connection);
        }

        await conn.createConnect(config.default).then(()=>{
					
				});
    }
}

module.exports = Model;