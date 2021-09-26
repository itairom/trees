import { httpService } from "./httpService"


async function save(tree) {
    await httpService.put(`tree/save`, tree)
        .then((res) => {
            console.log(res);
        })

    // if (tree._id) {

    // }
    // // let addPet = await storageService.post(STORAGE_KEY, pet)
    // return addPet
}
async function query(tableId) {
    let trees = await httpService.get(`tree/`,tableId)
    console.log("🚀 ~ file: treeService.js ~ line 19 ~ query ~ trees", trees)
    return trees
}

async function queryTableIdList() {
    let trees = await httpService.get(`tree/tableid`)
    console.log("🥳", trees)
    return trees
}

// async function update(pet) {
//     let updatedPet = await httpService.put(`pet/${pet._id}`, pet)
//     return updatedPet
// }

export const treeService = {
    save,
    query,
    queryTableIdList
}