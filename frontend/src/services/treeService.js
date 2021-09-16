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
async function query(pet) {
    let updatedPet = await httpService.get(`tree/`)
    console.log("🚀 ~ file: treeService.js ~ line 17 ~ query ~ updatedPet", updatedPet)
    return updatedPet
}
// async function update(pet) {
//     let updatedPet = await httpService.put(`pet/${pet._id}`, pet)
//     return updatedPet
// }

export const treeService = {
    save,
    query
}