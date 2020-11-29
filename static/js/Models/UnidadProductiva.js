class UnidadProductiva {

	constructor(lote, campo, cargaAnimal, indicesProductivos, recursoForrajero){
		this.campo = campo
		this.lote = lote
		this.cargaAnimal = cargaAnimal
		this.indicesProductivos = indicesProductivos
	}

	getMateriaSeca() {
		return this.lote.ndvi
	}

}

export default UnidadProductiva;