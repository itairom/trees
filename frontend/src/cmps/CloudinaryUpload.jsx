import React, { useEffect, useState } from "react"
import { cloudinaryService } from "../services/cloudinaryService"

export const CloudinaryUpload = (...props) => {

    // const [name, setName] = useState('')
    const [file, setFile] = useState(null)
    const [isUpload, setIsUpload] = useState(false)

    const sendFile = async ev => {
        ev.preventDefault()
        let imgUrlRes = await cloudinaryService.uploadImg(file)
        setIsUpload(true)
        setFile(imgUrlRes.url)
        props[0].onGetImgUrl(imgUrlRes.url)
    }

    const fileHandler = ev => {
        setFile(ev.target.files)
    }

    // const nameHandler = ev => {
    //     const { value } = ev.target
    //     setName(value)
    // }

    return (
        <section className="upload-container">
            <form action="#">
                {/* <div>
                    <label htmlFor="name">Name</label>
                    <input
                        required
                        type="text"
                        id="name"
                        onChange={(ev) => { nameHandler(ev) }} />
                </div> */}
                <div>
                    <label htmlFor="file"></label>
                    <input
                        required
                        multiple
                        name="file1"
                        type="file"
                        id="file"
                        onChange={(ev) => { fileHandler(ev) }} />
                </div>
                <button onClick={(ev) => sendFile(ev)} >Upload</button>
            </form>
            {file &&
                <div className="image-preview">
                    <p>Preview</p>
                    <img src={file} alt="image" />
                </div>
            }
        </section>
    )
}



