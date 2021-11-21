const express = require('express')
const {querySurvey, addSurvey, updateSurvey, querySurveyIdList, getSurveyTrees, removeTree, getTreeById } = require('./tree.controller')
const router = express.Router()

// router.get('/', getTrees)

router.get('/', querySurvey)
// router.get('/', getSurveyTrees)
// router.get('/survey_trees', getSurveyTrees)
router.get('/survey_id_list', querySurveyIdList)
// router.get('/:treeId&:username', getTreeById)
router.post('/save', addSurvey)
router.put('/save/:surveyId', updateSurvey)
// router.put('/save/:', addTree)
// router.delete('/:treeId&:username', removeTree)

module.exports = router