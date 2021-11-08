// REACT IMAGE UPLOAD WRAPPER
import React, { useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";
import { cloudinaryService } from "../services/cloudinaryService";

export const ImgUpload = ({ onGetImgUrl }) => {

    const [images, setImages] = useState([]);
    const maxNumber = 1;

    useEffect(() => {
        (async () => {
            if (images.length !== 0) {
                // console.log("🚀 ~ file: ImgUpload.jsx ~ line 15 ~ imgUrl", images[0].file)
                const imgUrl = await cloudinaryService.uploadImg(images[0].file)
                console.log("🚀 ~ file: ImgUpload.jsx ~ line 16 ~ imgUrl", imgUrl)
                onGetImgUrl(imgUrl.secure_url)
            }
        })()
    }, [images,onGetImgUrl])


    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };


    return (
        <ImageUploading
            // multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
            onClick={(ev) => { ev.stopPropagation() }}
        >
            {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps
            }) => (
                // write your building UI
                <div
                    onClick={(ev) => {
                        ev.stopPropagation()
                        ev.preventDefault()
                    }}
                    className="upload__image-wrapper ">
                    <button
                        className="upload-btn btn"
                        style={isDragging ? { color: "red" } : null}
                        onClick={(ev) => {
                            ev.preventDefault()
                            ev.stopPropagation()
                            onImageUpload()
                        }}
                        {...dragProps}
                    >
                        הוסף תמונה
                    </button>
                    &nbsp;
                    {/* <button
                        className="btn"
                        onClick={onImageRemoveAll}>Remove all images</button> */}
                    {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                            <img src={image.data_url} alt="" width="100" />
                            {/* <div className="image-item__btn-wrapper">
                                <button onClick={() => onImageUpdate(index)}>Update</button>
                                <button onClick={() => onImageRemove(index)}>Remove</button>
                            </div> */}
                        </div>
                    ))}
                </div>
            )}
        </ImageUploading>)
}