
function uploadImg(files) {
    const CLOUD_NAME = 'dhorz8v6v'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const formData = new FormData();
    formData.append('file', files[0])
    console.log('ev.target.files[0]):', files[0])
    formData.append('upload_preset', 'e4caygdi');

    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            return res
        })
        .catch(err => console.error(err))
}

export const cloudinaryService = {
    uploadImg
}