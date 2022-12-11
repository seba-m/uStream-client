import React, { useState, useEffect, useCallback} from "react";

import Cropper from 'react-easy-crop'
import { Slider } from '@mui/material';
import { getCroppedImg } from '../../hooks/cropImage'

import Modal from "react-bootstrap/Modal";

import styles from "./ImgCropper.module.scss";


export function ImgCropper(props) {
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
          URL.createObjectURL(props.imgSelect),
          croppedAreaPixels,
          rotation
        )
        setCroppedImage(croppedImage)
        props.newImg(croppedImage);
      } catch (e) {
        console.error(e)
      }
    }, [croppedAreaPixels, rotation])
    
    
  return (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        animation={false}
        centered
        className={styles.imgCroppModal}
      >
        <div className={styles.cropperContainer}>
            
          
            <h2 className={styles.titleCropper}>Update profile picture</h2>
         
            <div className={styles.cropView}>
                <Cropper
                image={props.imgSelect? URL.createObjectURL(props.imgSelect) : props.def}
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
                />
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
                  <button className={styles.cancelButton} >Cancel</button>
                  <button className={styles.saveButton} onClick={showCroppedImage}>Save</button>
                </div>
                
            </div>
        
        </div>
        
        
        {/*<div className={styles.cropperContainer}>
          <img src={props.imgSelect? URL.createObjectURL(props.imgSelect) : props.defaultImage} alt="cropper"/>
        </div>*/}
      </Modal>
    </>
  );
}

export default ImgCropper;
