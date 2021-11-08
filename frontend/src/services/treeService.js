import { httpService } from "./httpService"


async function save(tree, user) {
    await httpService.put(`tree/save`, [tree, user])
        .then((res) => {
            console.log(res);
        })

}
async function queryTrees(tableId, username) {
    let trees = await httpService.get(`tree/`, [tableId, username])
    return trees
}
async function getTreeById(treeId,username) {
    let tree = await httpService.get(`tree/${treeId}&${username}`)
    return tree
}
async function removeTree(treeId, username) {
    let removedTree = await httpService.delete(`tree/${treeId}&${username}`)
    return removedTree
}

async function querySurveyIdList(loggedInUser) {
    let trees = await httpService.get(`tree/survey_id_list`, loggedInUser)
    return trees
}
async function querySurveyTrees(surveyId, username) {
    let trees = await httpService.get(`tree/survey_trees`, [surveyId, username])
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
    removeTree,
    getTreeById
}