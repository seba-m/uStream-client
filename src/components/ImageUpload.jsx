import { useState } from 'react';

import styles from './ImageUpload.module.scss';
import { ImgCropper } from './profile/ImgCropper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons';


export function ImageUpload({ defaultImage, onUpload, onDelete, isBanner }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [message, setMessage] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [newImage, setNewImage] = useState(null);
    const [isGif, setIsGif] = useState(false);

    console.log(isBanner);
    
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
        var file = isGif? newImage : new File([newImage], selectedImage.name, {type: "image/jpeg"});

        if (file) {
            let data = new FormData();
            data.append("photo",file);

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
        <div className={styles.imageSectionBox}>
            {message && (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                </div>
            )}
            <div className={styles.imgSubBox}>
                <div className={styles.imgContainer}>
                    { !isBanner ? <img className={`${styles.imgInput} ${styles.imgProfile}`} alt="" width={"250px"} src={newImage ? URL.createObjectURL(newImage) : defaultImage}/> 
                    : <img className={styles.imgBanner} alt="" width={"250px"} src={newImage? URL.createObjectURL(newImage) : defaultImage} />}
                </div>
                <div className={styles.imgUpdateButtons}>
                    <div className={styles.buttonsBox}>
                        <button  className={styles.buttonFile} onClick={() => {document.querySelector("#selecter").click()}}>Update image</button> 
                        <input 
                        hidden
                        id='selecter'
                        type="file"
                        name="photo"
                        accept="image/*"
                        placeholder=""
                        onClick={(event) => {
                            event.target.value = null;
                        }
                        }
                        onChange={(event) => {
                            var file = event.target.files[0];
                            if (file && file.type === "image/gif") {
                                setIsGif(true);
                                setNewImage(file);              
                            }else{
                                handleImgSelect(event); 
                                event.target.value = null;
                            }
                            
                        }}
                        className={styles.imgInputUpdate} 
                        />
                          
                        <button className={styles.removeButton} onClick={removeImage}>
                            <FontAwesomeIcon
                                icon={faTrash}
                                className={styles.iconTrash}
                            />
                        </button>
                    </div>
                    <span>It must be a JPEG, PNG or GIF file of maximum 10 MB.</span>    
                </div>              
            </div>

            <div className={`${styles.imgSubBox} ${styles.imgButton}`} >
                    <button onClick={saveChanges}>
                        Save changes
                    </button>
            </div>
            
            <ImgCropper 
                        saveChanges={saveChanges}
                        banner={isBanner} 
                        newImg={setNewImage} 
                        imgSelect={selectedImage} 
                        def={defaultImage} 
                        show={modalShow} 
                        onHide={() => setModalShow(false)}/>                
        </div>
    )
}
