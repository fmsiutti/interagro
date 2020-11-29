import { getSolarIrradiance } from  '../thirdParty.js'

class UnidadProductiva {

	constructor(lote, ndvi, recursoForrajero){
		this.lote = lote
		this.ndvi = ndvi
		this.recursoForrajero = recursoForrajero
	}

	getMateriaSeca() {

		let materiaSecaMensual = []
		let materiaSecaMensualDia = []
		let eur = this.getEUR()

		const lat = (this.lote.bounds[0] + this.lote.bounds[2]) / 2
		const lon = (this.lote.bounds[1] + this.lote.bounds[3]) / 2

		return getSolarIrradiance('2019', lat, lon).then(solarIrradianceMensual => {
			let i = 0;
			for (let key in solarIrradianceMensual) {
				const currentNdvi = this.ndvi[i]
				const rfai = solarIrradianceMensual[key] * 0.48
				const rfaa = rfai * Math.min((((1 + currentNdvi) / (1 - currentNdvi) ) / (11.62 - 1.55)) - (1.55 / (11.62 - 1.55)), 0.95)

				let materiaSeca = (rfaa * eur.pendiente + eur.ordenada) * 10

				materiaSecaMensualDia.push(materiaSeca)

				i++
			}
			console.log(materiaSecaMensualDia)
			materiaSecaMensualDia.forEach((materiaSeca, index) => {
				if (!isNaN(materiaSeca)) {
					if (index == 2) {
						materiaSeca *= 31
					}else if ([1,3,5,7,8,10,12].includes(index)){
						materiaSeca *= 28
					}else{
						materiaSeca *= 30
					}

					materiaSecaMensual.push(materiaSeca)
				}
			})

			console.log(materiaSecaMensual)
			console.log(materiaSecaMensual.reduce((a,b) => a + b))

			this.materiaSecaMensual = materiaSecaMensual
			return materiaSecaMensual

		})
	}


	reduceNdvi() {
		let ndvi_by_month = [];
		let averages = [];
		for (var i = 1; i < 13; i++){
		    ndvi_by_month.push(this.ndvi.filter(day => day.ndvi_mean && day.date.slice(5,7) == ('0' + i).slice(-2)))
		}

		ndvi_by_month.forEach(average => {
			let accum = 0;

			average.forEach(a => {
				accum += a.ndvi_mean;
			})

			averages.push(accum / average.length)
		})

		this.ndvi = averages

	}

	getEUR() {

		const recursosEur = {
			'Agropiro': {pendiente: 0.5393, ordenada: 0.2259},
			'Campo natural': {pendiente: 0.3233, ordenada: 0.5451},
			'Campo natural bajo dulce': {pendiente: 0.3233, ordenada: 0.5451},
			'Campo natural bajo salino': {pendiente: 0.3233, ordenada: 0.5451},
			'Campo natural con agropiro': {pendiente: 0.3233, ordenada: 0.5451},
			'Campo natural con festuca': {pendiente: 0.3233, ordenada: 0.5451},
			'Campo natural loma': {pendiente: 0.3233, ordenada: 0.5451},
			'Campo natural media loma': {pendiente: 0.3233, ordenada: 0.5451},
			'Pastura base alfalfa': {pendiente: 0.6315, ordenada: 0.3897},
			'Pastura consociada': {pendiente: 0.6357, ordenada: 0.6648},
			'Pastura de agropiro y festuca': {pendiente: 0.6357, ordenada: 0.6648},
			'Pastura de alfalfa pura': {pendiente: 0.751, ordenada: 2.34},
			'Pastura de festuca': {pendiente: 0.6357, ordenada: 0.6648},
			'Pastura de lloron': {pendiente: 10.852, ordenada: 1.414},
			'Promocion de raigras': {pendiente: 0.6682, ordenada: 0.6609},
			'Promocion intensiva de raigras': {pendiente: 1.24, ordenada: 0},
			'Verdeo de avena': {pendiente: 1.24, ordenada: 0},
			'Verdeo de avena y vicia': {pendiente: 1.24, ordenada: 0},
			'Verdeo de invierno': {pendiente: 1.24, ordenada: 0},
			'Verdeo de maiz': {pendiente: 2.494, ordenada: 0},
			'Verdeo de raigras': {pendiente: 1.24, ordenada: 0},
			'Verdeo de sorgo': {pendiente: 1.564, ordenada: 0},
			'Verdeo de triticale': {pendiente: 1.24, ordenada: 0},
			'Verdeo de verano': {pendiente: 2.494, ordenada: 0}
		}

		return  recursosEur[this.recursoForrajero]
	}

}

export default UnidadProductiva;