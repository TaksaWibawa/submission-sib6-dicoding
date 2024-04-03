import { Navigate, Outlet } from 'react-router-dom';
import { getAccessToken } from '../utils/network-data';

export function RoutePrivate() {
	const accessToken = getAccessToken();
	if (!accessToken) {
		return (
			<Navigate
				to="/login"
				replace
			/>
		);
	}
	return <Outlet />;
}
