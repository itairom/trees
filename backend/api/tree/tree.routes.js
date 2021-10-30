const express = require('express')
const {  addTree, querySurveyIdList, getSurveyTrees, removeTree,getTreeById } = require('./tree.controller')
const router = express.Router()

router.get('/', getSurveyTrees)
// router.get('/', getTrees)
router.get('/survey_id_list', querySurveyIdList)
router.get('/survey_trees', getSurveyTrees)
router.put('/save', addTree)
router.delete('/:treeId&:username', removeTree)
router.get('/:treeId', getTreeById)

module.exports = router