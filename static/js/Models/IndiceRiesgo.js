import { getSolarIrradiance } from  '../thirdParty.js'

class IndiceRiesgo {

	constructor(unidadesProductivas, vacas, toros, vaquillonas, novillos, novillitos){
		this.unidadesProductivas = unidadesProductivas
		this.cargaAnimal = vacas + toros * 1.2 + vaquillonas * .78 + novillos * .92 + novillitos * .78
	}

	calculateIndiceRiesgo(){
		this.unidadesProductivas.forEach(unidadProductiva => {
			
		})
	}

}

export default IndiceRiesgo;