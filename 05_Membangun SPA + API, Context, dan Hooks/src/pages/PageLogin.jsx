import { ContextLanguage } from '../stores';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useInput } from '../hooks';
import { InputBase } from '../components';
import { login, putAccessToken } from '../utils/network-data';

const LANG_LOGIN = {
	id: {
		title: 'Yuk, login untuk menggunakan aplikasi.',
		register: 'Belum punya akun?',
		registerLink: 'Daftar di sini',
		emptyAlert: 'Email dan password harus diisi!',
		emailAlert: 'Masukkan email yang valid!',
		passwordAlert: 'Password minimal 8 karakter!',
	},
	en: {
		title: 'Login to use app, please.',
		register: "Don't have an account?",
		registerLink: 'Register here',
		emptyAlert: 'Email and password must be filled!',
		emailAlert: 'Please enter a valid email!',
		passwordAlert: 'Password must be at least 8 characters long!',
	},
};

export function PageLogin() {
	const navigate = useNavigate();
	const { language } = useContext(ContextLanguage);

	const [email, setEmail] = useInput('');
	const [password, setPassword] = useInput('');

	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const minPasswordLength = 8;

		setLoading(true);

		if (!email || !password) {
			alert(LANG_LOGIN[language].emptyAlert);
		} else if (!emailRegex.test(email)) {
			alert(LANG_LOGIN[language].emailAlert);
		} else if (password.length < minPasswordLength) {
			alert(LANG_LOGIN[language].passwordAlert);
		} else {
			const response = await login({ email, password });
			if (response.error) return;
			alert(response.message);
			putAccessToken(response.data.accessToken);
			navigate('/');
		}

		setLoading(false);
	};

	return (
		<section className="login-page">
			<h2>{LANG_LOGIN[language].title}</h2>
			<div className="input-login">
				<InputBase
					type={'email'}
					name={'email'}
					placeholder={'example@gmail.com'}
					value={email}
					onChange={setEmail}
				/>
				<InputBase
					type={'password'}
					name={'password'}
					placeholder={'********'}
					value={password}
					onChange={setPassword}
				/>
				<button
					type="button"
					className={`${loading ? 'disabled' : ''}`}
					onClick={handleSubmit}
					disabled={loading}
				>
					{loading ? 'Loading...' : 'Login'}
				</button>
			</div>
			<p>
				{LANG_LOGIN[language].register} <Link to="/register">{LANG_LOGIN[language].registerLink}</Link>
			</p>
		</section>
	);
}
