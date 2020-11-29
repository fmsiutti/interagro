const getSolarIrradiance = (year, lat, lon) => {
	return fetch('https://wip.starkwolf.me/interagro-solar-api/index.php?year=' + year + '&lat=' + lat + '&lon=' + lon)
	.then(res => res.json())
	.then(json => {
		return json.features[0].properties.parameter.ALLSKY_SFC_SW_DWN
	})
	.catch(err => {
		console.log(err)
	})
}

export {
	getSolarIrradiance,
}