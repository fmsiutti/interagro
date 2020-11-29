import { UnidadProductiva, IndiceRiesgo } from  './Models/index.js'
import { getSolarIrradiance } from  './thirdParty.js'
import { getActualField, getNdviByField } from './auravantAPI.js'

let unidadesProductivas = [];

getActualField().then(lote => {
	if (lote.id) {
		document.querySelector('#titulo').innerText = 'Calcular Indice de Riesgo para el lote ' + lote.nombre

		getNdviByField(lote.id).then(ndvi => {
			
			const unidadProductiva = new UnidadProductiva(lote, ndvi.ndvi, 'Agropiro')
			unidadProductiva.reduceNdvi()
			unidadProductiva.getMateriaSeca().then(res => {
				unidadesProductivas.push(unidadProductiva)
			})
		})
	}else{
		document.querySelector('#titulo').innerText = 'Selecciona un lote antes de empezar!'
	}
})
// document.querySelector('#boton').addEventListener('click', () => {

// 	const vacas = 100
// 	const toros = 100
// 	const vaquillonas = 100
// 	const novillos = 100
// 	const novillitos = 100

// 	let indiceRiesgo = new IndiceRiesgo(unidadesProductivas, vacas,toros,vaquillonas,novillos,novillitos)

// })

	

// 	console.log('El ndvi es: ', unidad_1.getMateriaSeca())


// document.querySelector('#form').addEventListener('submit', (event) => {

// 	event.preventDefault()

// 	let formdata = new FormData(document.querySelector('#form'))
// 	cosole.log (formdata)


// 	})