import { useState } from 'react';

import AuthService from "../../services/Auth.service"
import UserService from "../../services/User.service";

import { Spinner } from '../Spinner';

import styles from './DeleteConfirm.module.scss';
import Modal from "react-bootstrap/Modal";

export function DeleteConfirm({ show, onHide, handleDelete }) {
	const handleDeleting = () => {
		handleDelete();
		onHide();
	};

	return (
		<>
		<Modal
		show={show}
		onHide={onHide}
		aria-labelledby="contained-modal-title-vcenter"
		animation={false}
		centered
		className={styles.modalContainer}
		>
			<div className={styles.deleteContainer}>
				<h2 className={styles.deleteTitle}>Confirm deletion</h2>
				<div className={styles.lineDelete}></div>
				<p className={styles.deleteDescription}>Are you sure you want to delete your account?<br/>This action is <strong>permanent</strong> and cannot be undone.</p>
				<div className={styles.buttons}>
					<button className={styles.cancelButton} onClick={onHide}>Cancel</button>
					<button className={styles.deleteButton} onClick={handleDeleting}>Delete account</button>
				</div>
			</div>
		</Modal>
			
		</>
	)
}
