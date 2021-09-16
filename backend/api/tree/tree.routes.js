const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
// const { log } = require('../../middlewares/logger.middleware')
const { getTrees, addTree } = require('./tree.controller')
const router = express.Router()

router.get('/', getTrees)
// router.get('/:id',  getPetByid)
router.put('/save', addTree)
// router.delete('/:id', requireAuth, requireAdmin, log, removePet)

module.exports = router