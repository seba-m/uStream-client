import React, { useState, useEffect, useCallback} from "react";

import Cropper from 'react-easy-crop'
import { Slider } from '@mui/material';
import { getCroppedImg } from '../../hooks/cropImage'

import Modal from "react-bootstrap/Modal";

import styles from "./ImgCropper.module.scss";


export function ImgCropper({ saveChanges, banner, newImg, imgSelect, def, show, onHide }) {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [rotation, setRotation] = useState(0)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState(null)
    const [image, setImage] = useState(null)
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels)
    }, [])
   
    const showCroppedImage = useCallback(async () => {
      try {
        const croppedImage = await getCroppedImg(
          URL.createObjectURL(imgSelect),
          croppedAreaPixels,
          rotation
        )
        setCroppedImage(croppedImage)
        newImg(croppedImage);
        onHide();
        //saveChanges();
      } catch (e) {
        console.error(e)
      }
    }, [croppedAreaPixels, rotation])

    
    
  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        animation={false}
        centered
        className={styles.imgCroppModal}
      >
        <div className={styles.cropperContainer}>
            
          
            <h2 className={styles.titleCropper}>Update profile picture</h2>
         
            <div className={styles.cropView}>
                {banner? 
                  <Cropper
                  image={imgSelect? URL.createObjectURL(imgSelect) : def}
                  crop={crop}
                  zoom={zoom}
                  showGrid={false}
                  aspect={19 / 9}
                  onCropChange={setCrop}
                  onRotationChange={setRotation}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  style={{width: '100%', height: '100%'}}
                  />:
                  <Cropper
                  image={imgSelect? URL.createObjectURL(imgSelect) : def}
                  crop={crop}
                  zoom={zoom}
                  showGrid={false}
                  cropShape='round'
                  aspect={1 / 1}
                  onCropChange={setCrop}
                  onRotationChange={setRotation}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  style={{width: '100%', height: '100%'}}
                  />}                
            </div>
            <div className={styles.controls}>
                <Slider 
                    defaultValue={1}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-label="Default"
                    onChange={(e) => {
                        setZoom(e.target.value)
                      }}
                    valueLabelDisplay="auto"/>
                <div className={styles.buttons}>
                  <button className={styles.cancelButton} onClick={onHide}>Cancel</button>
                  <button className={styles.saveButton} onClick={showCroppedImage}>Cut</button>
                </div>
            </div>
        </div>
      </Modal>
    </>
  );
}

export default ImgCropper;
