const getActualFarm = () => {
	return avt.state.async_getActualFarm()
		.then(campo => campo.info)
}

const getActualField = () => {
	return avt.state.async_getActualField()
		.then(lote => lote.info)
}

const getNdviByField = field_id => {
	const url = 'https://api.auravant.com/api/fields/ndvi?field_id=' + field_id;
	return fetch(url, {
		headers: {Authorization: 'Bearer ' + token}
	}).then(res => res.json())
	.then(json => json)
}


export {
	getActualField,
	getActualFarm,
	getNdviByField,
}