import { utilService } from "./utilService"
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
async function query() {
    let trees = await httpService.get(`tree/`)
    console.log("🚀 ~ file: treeService.js query ", trees)
    return trees
}
// async function update(pet) {
//     let updatedPet = await httpService.put(`pet/${pet._id}`, pet)
//     return updatedPet
// }

export const treeService = {
    save,
    query
}