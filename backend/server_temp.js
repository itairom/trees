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
const PORT = 3030


app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser())

app.listen(
    PORT, console.log('listening')
)

const corsOptions = {
    origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true
}
app.use(cors(corsOptions))

const treeRoutes = require('./api/tree/tree.routes')
app.use('/api/tree', treeRoutes)

//REST



app.post('/upload', multiUpload, async (req, res) => {
    const { id } = req.query
    const filename = `${id}.pdf`
    pdfService.buildAnimalsPDF(filename, id)

})
// app.post('/upload', upload.single('file'), async (req, res) => {
//     doc.pipe(fs.createWriteStream('output.pdf'));

//     doc.font('fonts/PalatinoBold.ttf')
//         .fontSize(25)
//         .text('Some text with an embedded font!', 100, 100);

//     doc.end();
//     console.log('finish doc');

// })