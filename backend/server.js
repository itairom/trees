const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const app = express()
const http = require('http').createServer(app)
const expressSession = require('express-session')



const session = expressSession({
    secret: 'coding is amazing',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
})


app.use(session)


app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser())


// app.listen(port, () => {
//     console.log(`App listening on port ${port}!`)
// });

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https')
            res.redirect(`https://${req.header('host')}${req.url}`)
        else
            next()
    })
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}


const treeRoutes = require('./api/tree/tree.routes')
app.use('/api/tree', treeRoutes)


// // ROUTES REQ
// const authRoutes = require('./api/auth/auth.routes')
// const userRoutes = require('./api/user/user.routes')
// const treeRoutes = require('./api/tree/tree.routes')

// // routes
// const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')
// app.all('*', setupAsyncLocalStorage)

// app.get('/api/setup-session', (req, res) => {
//     req.session.connectedAt = Date.now()
//     console.log('setup-session:', req.sessionID);
//     res.end()
// })

// // USING ROUTES

// app.use('/api/auth', authRoutes)
// app.use('/api/user', userRoutes)
// app.use('/api/tree', treeRoutes)


app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})



const port = process.env.PORT || 3030;
app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
});
