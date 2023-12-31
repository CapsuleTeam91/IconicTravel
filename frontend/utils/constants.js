export const URL_EXPO = 'https://iconic-travel-backend.vercel.app';

/* DATA */
export const DEFAULT_AVATAR =
	'https://res.cloudinary.com/dvmipcwy7/image/upload/v1690571975/ezulphnetoa65bodxzwn.jpg';

/* VIEW STATES */
export const SIGN_VIEW = {
	up: 'signup',
	in: 'signin',
};

/* ERRORS */
export const ERRORS = {
	err400: 'Les données sont incorrectes',
	err403: `Veuillez remplir tous les champs`,
	err404: 'Aucun compte rattaché à cet email ou mauvais mot de passe',
	err409: `Vous avez déjà un compte`,
	err500: 'Erreur du serveur',
	difPassword: 'Mots de passe différents',
	default: `Champs mal remplis`,
	invalidEmailFormat: 'Email invalid',
	// emptyFunny: `Ooh ooh c'est vide !`,
	noName: `Ajoutez un nom avant de continuer !`,
};

/* REGEX */
// Grabbed from emailregex.com
export const EMAIL_REGEX =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
