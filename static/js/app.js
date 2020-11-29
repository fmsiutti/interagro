import { UnidadProductiva } from  './Models/index.js'
import { getActualField, getNdviByField } from './auravantAPI.js'

getActualField().then(lote => {
	if (lote.id) {
		document.querySelector('#titulo').innerText = 'Calcular Indice de Riesgo para el lote ' + lote.nombre

		getNdviByField(lote.id).then(ndvi => {
			console.log(ndvi)
		})
	}else{
		document.querySelector('#titulo').innerText = 'Selecciona un lote antes de empezar!'
	}
})


document.querySelector('#boton').addEventListener('click', () => {
	

	const unidad_1 = new UnidadProductiva({
		id: 1,
		bounds: [ 1, 2, 3, 4 ],
		ndvi: .7,
		area: 120,
		nombre: 'Lote 1',
		wkt: 'wkt',
	}, 'campo1', 1.5, {'indice1': .3, 'indice2': 125})

	console.log('El ndvi es: ', unidad_1.getMateriaSeca())

})

document.querySelector('#form').addEventListener('submit', (event) => {

	event.preventDefault()

	let formdata = new FormData(document.querySelector('#form'))
	cosole.log (formdata)


	})