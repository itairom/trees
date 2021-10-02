import React, { useState } from "react"
import axios from 'axios'
import _ from "lodash"

export const ImageUpload = () => {

    const [name, setName] = useState('')
    const [file, setFile] = useState('')

    const sendFile = ev => {
        ev.preventDefault()
        axios.post('http://localhost:3030/upload', file, { params: { id: name } })
            .then(res => {
            })
            .catch(err => {
            })
    }

    const fileHandler = ev => {
        const data = new FormData()
        _.forEach(ev.target.files, file => {
            data.append('name', name,)
            data.append('files', file,)
        })
        // const file = ev.target.files[0]
        setFile(data)
    }

    const nameHandler = ev => {
        const { value } = ev.target
        setName(value)
    }


    return (
        <section className="upload-container">
            <form action="#">
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        required
                        type="text"
                        id="name"
                        onChange={(ev) => { nameHandler(ev) }} />
                </div>
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
        </section>
    )
}



