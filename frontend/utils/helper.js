const toRadius = (deg) => {
	return deg * (Math.PI / 180);
};

const convertCoordsToKm = (origin, target) => {
	const R = 6371;

	const latRadians = toRadius(target.latitude - origin.latitude) / 2;
	const longRadians = toRadius(target.longitude - origin.longitude) / 2;

	const a =
		Math.pow(Math.sin(latRadians), 2) +
		Math.cos(toRadius(origin.latitude)) *
			Math.cos(toRadius(target.latitude)) *
			Math.pow(Math.sin(longRadians), 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	return (R * c).toFixed(2);
};

export { convertCoordsToKm };

export const getAge = (dob) => {
	var ageDifMs = Date.now() - new Date(dob);
	var ageDate = new Date(ageDifMs);
	return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const checkDOB = (dob) => {
	var ageDifMs = Date.now() - dob;
	var ageDate = new Date(ageDifMs); // miliseconds from epoch
	return Math.abs(ageDate.getUTCFullYear() - 1970) <= 18;
};
