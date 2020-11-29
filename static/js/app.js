import { UnidadProductiva } from  './Models/index.js'
import { getActualField, getNdviByField } from './auravantAPI.js'

document.querySelector('#boton').addEventListener('click', () => {
	
	getActualField().then(lote => {
		console.log(lote)
		getNdviByField(lote.id).then(ndvi => {
			console.log(ndvi)
		})
	})

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