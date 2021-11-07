const express = require('express')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
// const pdfService = require('./services/pdf.service');
let fileIdx = 0
const app = express()

const session = expressSession({
    secret: '512gs2154%$!^@gs9',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
})

app.use(session)

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

const port = process.env.PORT || 3030;

app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser())



if (process.env.NODE_ENV === 'production') {
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


// ROUTES REQ


const treeRoutes = require('./api/tree/tree.routes')
app.use('/api/tree', treeRoutes)


const authRoutes = require('./api/auth/auth.routes')
app.use('/api/auth', authRoutes)

const userRoutes = require('./api/user/user.routes')
app.use('/api/user', userRoutes)


// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


//REST

// app.post('/upload', multiUpload, async (req, res) => {
//     const { id } = req.query
//     const filename = `${id}.pdf`
//     pdfService.buildAnimalsPDF(filename, id)

// })
