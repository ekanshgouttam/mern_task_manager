export const isAuthenticated = () => {
	const token = localStorage.getItem('token');
	const user = localStorage.getItem('user');

	try {
	  return token && user ? JSON.parse(user) : null;
  	} catch (err) {return null;}};
