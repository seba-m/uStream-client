import { useState } from 'react';

export function ImageUpload({ defaultImage, onUpload, onDelete }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [message, setMessage] = useState("");

    //only for dev
    defaultImage = "https://static-cdn.jtvnw.net/jtv_user_pictures/74aca484-10fe-4a74-b5ed-bb4a5414c1bb-profile_image-300x300.png";

    const removeImage = () => {
        if (!selectedImage) {
            onDelete();
        } else {
            setSelectedImage(null);
        }
    };

    const saveChanges = () => {
        onUpload(selectedImage).then(
            (error) => {
                const resMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
            }
        );
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
            <div>
                <img alt="" width={"250px"} src={selectedImage ? URL.createObjectURL(selectedImage) : defaultImage} />
                <br />
                <button onClick={removeImage}>Remove</button>
            </div>
            <br />

            <br />
            <input
                type="file"
                name="myImage"
                accept="image/png, image/gif, image/jpeg"
                onChange={(event) => {
                    setSelectedImage(event.target.files[0]);
                }}
            />

            <button onClick={saveChanges}>
                Save changes
            </button>
        </>
    )
}
