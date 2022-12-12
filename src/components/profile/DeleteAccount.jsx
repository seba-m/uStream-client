import { useState } from 'react';

import AuthService from "../../services/Auth.service"
import UserService from "../../services/User.service";

import { Spinner } from '../Spinner';
import styles from './DeleteAccount.module.scss';

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
					window.location.href = "/";
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

			<div className={styles.profileEditContainer}>
				<div className={styles.profileEditBox}>
					<div className={styles.profileEditSubBox}>
						<div className={styles.editFieltTittle}>
							<p>Delete account</p>
						</div>
						<div className={styles.profileEditField}>
							<div className={styles.textDelete}>
								<span className={styles.helpField}>If you want to delete your uStream account, you can do so by clicking on the following button.</span>
							</div>
							<button className={styles.buttonDeleteAccount} onClick={askDelete}>
								Delete Account
							</button>
						</div>
					</div>
				 
				</div>
			</div>

			
		</>
	)
}
