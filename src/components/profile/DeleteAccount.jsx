import { useState } from 'react';

import AuthService from "../../services/Auth.service"
import UserService from "../../services/User.service";

import { Spinner } from '../Spinner';

export function DeleteAccount({ user }) {
	const [message, setMessage] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = () => {
		setIsDeleting(true);
		setMessage("");

		UserService.deleteAccount(user.id)
			.then(
				() => {
					AuthService.logout();
				}
			).catch(
				(error) => {
					const resMessage =
						(error.response && error.response.data && error.response.data.message) ||
						error.message ||
						error.toString();

					setMessage(resMessage);
				}
			).finally(() => {
				setIsDeleting(false);
			});
	};

	const askDelete = () => {
		if (window.confirm(`Are you sure you want to delete your account?`)) {
			handleDelete();
		}
	};

	return (
		<>
			{isDeleting && <Spinner />}
			{message && (
				<div className="form-group">
					<div className="alert alert-danger" role="alert">
						{message}
					</div>
				</div>
			)}
			<button onClick={askDelete}>
				Delete Account
			</button>
		</>
	)
}
