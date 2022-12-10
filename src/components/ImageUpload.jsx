import { useState } from 'react';

import styles from './ImageUpload.module.scss';
import { ImgCropper } from './profile/ImgCropper';


export function ImageUpload({ defaultImage, onUpload, onDelete, isBanner }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [message, setMessage] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [newImage, setNewImage] = useState(null);
    
    function handleImgSelect(e) {
        setSelectedImage(e.target.files[0]);
        setModalShow(true);
    }

    const removeImage = () => {
        if (!selectedImage) {
            onDelete();
        } else {
            setSelectedImage(null);
        }
    };

    const saveChanges = () => {
        var file = new File([newImage], "photo");
        fetch('./image.jpeg')
            .then((res) => res.blob())
            .then((newImage) => {
                console.log(newImage);
                // logs: Blob { size: 1024, type: "image/jpeg" }
            });


        if (newImage) {
            //console.log(file);
            let data = new FormData();
            data.append("photo", newImage);

            onUpload(data).then(
                (error) => {
                    const resMessage =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                }
            );
        } else {
            setMessage("No image selected");
        }
    };

    return (
        <>
            {message && (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                </div>
            )}
            <div className={styles.imgField}>
                <div className={styles.imgContainer}>
                    { !isBanner ? <img className={`${styles.imgInput} ${styles.imgProfile}`} alt="" width={"250px"} src={newImage ? newImage : defaultImage}/> 
                    : <img className={styles.imgBanner} alt="" width={"250px"} src={/*newImage ? newImage : */defaultImage} />}
                </div>
                <div className={styles.imgUpdateButtons}>
                    <div>
                        <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onClick={(event) => {
                            event.target.value = null;
                        }
                        }
                        onChange={(event) => {
                            handleImgSelect(event); 
                            event.target.value = null;
                        }}
                        />
                        
                        <button onClick={removeImage}>Remove</button>
                    </div>
                    <span>It must be a JPEG, PNG or GIF file of maximum 10 MB.</span>
                    
                </div>
                
                
            </div>


            <button onClick={saveChanges}>
                Save changes
            </button>
            <ImgCropper newImg={setNewImage} imgSelect={selectedImage} def={defaultImage} show={modalShow} onHide={() => setModalShow(false)} />                

        </>
    )
}
