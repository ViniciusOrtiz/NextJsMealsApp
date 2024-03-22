'use client'

import Image from 'next/image';
import { useRef, useState } from 'react';
import styles from './meals-image-picker.module.css';

type Input = {
    label: string,
    name: string
}

export default function MealsImagePicker({label, name}: Input) {
    const [pickedImage, setPickedImage] = useState<any>();
    const imageInput = useRef() as any;

    function handlePickClick() {
        imageInput.current.click();
    }

    function handleImageChange(event: any) {
        const file = event.target.files[0];
        if(!file) {
            setPickedImage(null);
            return
        }
        const fileReader = new FileReader();

        fileReader.onload = () => {
            fileReader.result && setPickedImage(fileReader.result);
        }

        fileReader.readAsDataURL(file);
    }

    return (
        <div className={styles.picker}>
            <label htmlFor="image">{label}</label>
            <div className={styles.controls}>
                <div className={styles.preview}>
                    {!pickedImage && <p>No image picked yet.</p>}
                    {pickedImage && <Image src={pickedImage} alt='The image selected by the user.' fill />}
                </div>
                <input 
                    className={styles.input}
                    type="file" 
                    id='image' 
                    accept='image/png, image/jpeg' 
                    name={name} 
                    ref={imageInput}
                    onChange={handleImageChange}
                    required/>
                <button className={styles.button} type='button' onClick={handlePickClick}>
                    Pick an Image
                </button>
            </div>
        </div>
    )
}