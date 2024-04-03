import { Navigate, Outlet } from 'react-router-dom';
import { getAccessToken } from '../utils/network-data';

export function RouteProtected() {
	const accessToken = getAccessToken();
	if (accessToken) {
		return (
			<Navigate
				to="/"
				replace
			/>
		);
	}
	return <Outlet />;
}
