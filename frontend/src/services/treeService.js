import { httpService } from "./httpService"


async function save(tree) {
    await httpService.put(`tree/save`, tree)
        .then((res) => {
            console.log(res);
        })

}
async function queryTrees(tableId) {
    let trees = await httpService.get(`tree/`,tableId)
    return trees
}
async function removeTree(treeId) {
    console.log("🚀 ~ file: treeService.js ~ line 16 ~ removeTree ~ treeId", treeId)
    let removedTree = await httpService.delete(`tree/${treeId}`)
    return removedTree
}

async function querySurveyIdList() {
    let trees = await httpService.get(`tree/survey_id_list`)
    return trees
}
async function querySurveyTrees(surveyId) {
    let trees = await httpService.get(`tree/survey_trees`,surveyId)
    return trees
}

// async function update(pet) {
//     let updatedPet = await httpService.put(`pet/${pet._id}`, pet)
//     return updatedPet
// }

export const treeService = {
    save,
    queryTrees,
    querySurveyIdList,
    querySurveyTrees,
    removeTree
}