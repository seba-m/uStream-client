import { useState } from 'react';

import AuthService from "../../services/Auth.service"
import UserService from "../../services/User.service";

import { Spinner } from '../Spinner';
import styles from './DeleteAccount.module.scss';

import { DeleteConfirm } from './DeleteConfirm';

export function DeleteAccount({ user }) {
	const [message, setMessage] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);
	const [modalShow, setModalShow] = useState(false);


	const handleDelete = () => {
		setIsDeleting(true);
		setMessage("");

		console.log("Delete account");

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
		setModalShow(true);
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
				<h2 className={styles.profileEditTittle}>Delete your uStream account</h2>
				<p className={styles.profileEditSubtittle}>Delete your account completely</p>
				<div className={styles.profileEditBox}>
					<div className={styles.profileEditSubBox}>
						<span className={styles.helpField}>If you want to delete your uStream account, you can do so by clicking on the following button.</span>
						<button className={styles.buttonDeleteAccount} onClick={askDelete}>Delete Account</button>
					</div>
				</div>
			</div>

			<DeleteConfirm 
                        show={modalShow} 
                        onHide={() => setModalShow(false)}
						handleDelete={handleDelete}/>  
		</>
	)
}
