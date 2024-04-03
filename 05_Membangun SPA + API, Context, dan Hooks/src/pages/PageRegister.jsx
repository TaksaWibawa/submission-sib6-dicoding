import { ContextLanguage } from '../stores';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useInput } from '../hooks';
import { InputBase } from '../components';
import { register } from '../utils/network-data';

const LANG_REGISTER = {
	id: {
		title: 'Isi form untuk mendaftar akun.',
		register: 'Sudah punya akun?',
		registerLink: 'Login di sini',
		emptyAlert: 'Seluruh form harus diisi!',
		nameAlert: 'Nama harus diisi!',
		emailAlert: 'Masukkan email yang valid!',
		passwordAlert: 'Password minimal 8 karakter!',
		confirmPasswordAlert: 'Password tidak sama!',
	},
	en: {
		title: 'Fill the form to register an account.',
		register: 'Already have an account?',
		registerLink: 'Login here',
		emptyAlert: 'All forms must be filled!',
		nameAlert: 'Name must be filled!',
		emailAlert: 'Enter a valid email!',
		passwordAlert: 'Password must be at least 8 characters!',
		confirmPasswordAlert: 'Password does not match!',
	},
};

export function PageRegister() {
	const navigate = useNavigate();
	const { language } = useContext(ContextLanguage);

	const [name, setName] = useInput('');
	const [email, setEmail] = useInput('');
	const [password, setPassword] = useInput('');
	const [confirmPassword, setConfirmPassword] = useInput('');

	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const minPasswordLength = 8;

		setLoading(true);

		if (!name || !email || !password || !confirmPassword) {
			alert(LANG_REGISTER[language].emptyAlert);
		} else if (name === '') {
			alert(LANG_REGISTER[language].nameAlert);
		} else if (!emailRegex.test(email)) {
			alert(LANG_REGISTER[language].emailAlert);
		} else if (password.length < minPasswordLength) {
			alert(LANG_REGISTER[language].passwordAlert);
		} else if (password !== confirmPassword) {
			alert(LANG_REGISTER[language].confirmPasswordAlert);
		} else {
			await register({ name, email, password }).then((res) => {
				alert(res.message);
				navigate('/login');
			});
		}

		setLoading(false);
	};

	return (
		<section className="register-page">
			<h2>{LANG_REGISTER[language].title}</h2>
			<div className="input-register">
				<InputBase
					type={'text'}
					name={'name'}
					placeholder={'Taksa Wibawa'}
					value={name}
					onChange={setName}
				/>
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
				<InputBase
					type={'password'}
					name={'confirm password'}
					placeholder={'********'}
					value={confirmPassword}
					onChange={setConfirmPassword}
				/>
				<button
					type="button"
					className={`${loading ? 'disabled' : ''}`}
					onClick={handleSubmit}
					disabled={loading}
				>
					{loading ? 'Loading...' : 'Register'}
				</button>
			</div>
			<p>
				{LANG_REGISTER[language].register} <Link to="/login">{LANG_REGISTER[language].registerLink}</Link>
			</p>
		</section>
	);
}
