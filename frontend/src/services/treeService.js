import { httpService } from "./httpService"


// async function save(tree, user) {
//     await httpService.put(`tree/save`, [tree, user])
//         .then((res) => {
//             console.log(res);
//         })
// }


async function save(survey, user) {
    if (survey._id) {
        try {
            return await httpService.put(`tree/save/${survey._id}`, [survey, user])
        } catch (err) {
            throw err
        }
    } else {
        try {
            await httpService.post(`tree/save`, [survey, user])
        } catch (err) {
            throw err
        }
    }
}
async function querySurvey(survyName, username) {
    let survey = await httpService.get(`tree/`, [survyName, username])
    return survey
}



// async function queryTrees(tableId, username) {
//     let trees = await httpService.get(`tree/`, [tableId, username])
//     return trees
// }
async function getTreeById(treeId, username) {
    let tree = await httpService.get(`tree/${treeId}&${username}`)
    return tree
}
async function removeTree(treeId, username) {
    let removedTree = await httpService.delete(`tree/${treeId}&${username}`)
    return removedTree
}

async function querySurveyIdList(loggedInUser) {
    let idList = await httpService.get(`tree/survey_id_list`, loggedInUser)
    return idList
}
async function querySurveyTrees(surveyId, username) {
    let trees = await httpService.get(`tree/survey_trees`, [surveyId, username])
    return trees
}

// async function update(pet) {
//     let updatedPet = await httpService.put(`pet/${pet._id}`, pet)
//     return updatedPet
// }

const finalSurveyNote = () => {
    return (
        `<div>
1 סקר זה הינו סקר נופי אגרונומי ואינו סקר הערכת סיכונים/סקר בטיחות.
 . 2 אין לבצע את כריתת/העתקת העצים המומלצים אלא לאחר קבלת רישיון כריתה כחוק - מפקיד היערות העירוני.
 . 3 כל פעולה העלולה לגרום מוות לעץ (כולל פגיעה/חיתוך שורשיו) – נחשבת עפ"י החוק ככריתה ללא היתר.
 . 4 עץ המוגדר לשימור – אין לבצע עבודות גיזום נוף/גיזום שורשים - ללא תאום עם הח"מ.
 . 5 עץ המוגדר לשימור – אין לבצע עבודות חפירה ו/או מילוי במרחק הקטן מ 3 - מ' מקצה גזע העץ – ללא תאום עם הח"מ.
 . 6 תוקף הסקר 6 חודשים מביצוע הסק הרי בשטח.
 . 7 עצים המאושרים לכריתה, יינטעו תמורתם עצים באותו הערך – כפיצוי נופי.
 . 8 מספר העצים בהתאם לתכנית הסקר , יבוצע מייד עם הכניסה לביצוע העבודות באתר – הסימון יאושר ע"י המפקח והאגרונום.
 . 9 כל העצים יסומנו ויוגנו בהתאם לפרט בגוף התכנית , טרם תחילת העבודות באתר.
 .10 להלן תמונות העצים.
 .11 מצ"ב מפת הסקר כולל סימון העצים ומספורם.
</div>`
    )
}



export const treeService = {
    save,
    querySurveyIdList,
    querySurveyTrees,
    removeTree,
    getTreeById,
    finalSurveyNote,
    querySurvey
}