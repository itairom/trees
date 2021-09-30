import { httpService } from "./httpService"


async function save(tree) {
    await httpService.put(`tree/save`, tree)
        .then((res) => {
            console.log(res);
        })

}
async function queryTrees(tableId) {
    let trees = await httpService.get(`tree/`,tableId)
    console.log("🌲 queryTrees", trees)
    return trees
}

async function querySurveyIdList() {
    let trees = await httpService.get(`tree/survey_id_list`)
    console.log("🥳", trees)
    return trees
}
async function querySurveyTrees(surveyId) {
    let trees = await httpService.get(`tree/survey_trees`,surveyId)
    console.log("🥳", trees)
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
    querySurveyTrees
}