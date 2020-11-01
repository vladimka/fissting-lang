class ImportStatement{
	constructor(path){
		this.name = 'ImportStatement';
		this.path = path;
	}

	execute(){
		require('../../../lib/modules/' + this.path.eval().asString())();
	}
}

module.exports = ImportStatement;