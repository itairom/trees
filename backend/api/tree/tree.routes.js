const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
// const { log } = require('../../middlewares/logger.middleware')
const { getTrees, addTree, querySurveyIdList, getSurveyTrees } = require('./tree.controller')
const router = express.Router()

router.get('/', getSurveyTrees)
router.get('/', getTrees)
router.get('/survey_id_list', querySurveyIdList)
router.get('/survey_trees', getSurveyTrees)
// router.get('/:id',  getPetByid)
router.put('/save', addTree)
// router.delete('/:id', requireAuth, requireAdmin, log, removePet)

module.exports = router