const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const stream = require('stream')
const fs = require('fs')
const pdfService = require('./services/pdf.service');
let fileIdx = 0


const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        const { id } = req.query
        let path = `images/${id}`
        fs.mkdirSync(path, { recursive: true })
        cb(null, path)
    },
    filename: (req, file, cb) => {
        cb(null, (fileIdx++) + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage })

let multiUpload = upload.fields([{ name: 'files', maxCount: 3 }])

const app = express()
const port = process.env.PORT || 3030;

app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser())

// app.get('/**', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })

// const corsOptions = {
//     origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
//     credentials: true
// }
// app.use(cors(corsOptions))


if (process.env.NODE_ENV === 'production') {
    // app.use(express.static(path.resolve(__dirname, 'public')))
    app.use(express.static('public'));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
});


const treeRoutes = require('./api/tree/tree.routes')
app.use('/api/tree', treeRoutes)

//REST



app.post('/upload', multiUpload, async (req, res) => {
    const { id } = req.query
    const filename = `${id}.pdf`
    pdfService.buildAnimalsPDF(filename, id)

})