import React, { useState } from "react"
import { cloudinaryService } from "../services/cloudinaryService"

export const CloudinaryUpload = (...props) => {

    // const [name, setName] = useState('')
    const [file, setFile] = useState(null)
    const [isUpload, setIsUpload] = useState(false)

    const sendFile = async img => {
        setIsUpload(true)
        let imgUrlRes = await cloudinaryService.uploadImg(img)
        setIsUpload(false)
        setFile(imgUrlRes.url)
        props[0].onGetImgUrl(imgUrlRes.url)
    }

    const fileHandler = ev => {
        // setFile(ev.target.files)
        sendFile(ev.target.files)
    }

    // const nameHandler = ev => {
    //     const { value } = ev.target
    //     setName(value)
    // }

    return (
        <section className="upload-container">
            <label htmlFor="file">בחר תמונה</label>
            <input
                required
                multiple
                name="file1"
                type="file"
                id="file"
                className="upload-btn"
                onChange={(ev) => { fileHandler(ev) }} />
            {isUpload &&
                <img src="/imgs/circle_loader.gif" alt="loader" />
            }
            {file &&

                <div className="image-preview">
                    <p>Preview</p>
                    <img src={file} alt="image" />
                </div>
            }
        </section>
    )
}



