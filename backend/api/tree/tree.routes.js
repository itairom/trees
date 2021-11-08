const express = require('express')
const { addTree, querySurveyIdList, getSurveyTrees, removeTree, getTreeById } = require('./tree.controller')
const router = express.Router()

// router.get('/', getTrees)

router.get('/', getSurveyTrees)
router.get('/survey_trees', getSurveyTrees)
router.get('/survey_id_list', querySurveyIdList)
router.get('/:treeId&:username', getTreeById)
router.put('/save', addTree)
router.delete('/:treeId&:username', removeTree)

module.exports = router