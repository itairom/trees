import React, { useEffect, useState } from "react"

export const TreesTypesTable = ({ trees }) => {

    const [treeTypeObj, setTreeTypeObj] = useState([])
    const [treeTypeKeysArr, setTreeTypeKeysArr] = useState([])
    const [totalvaluesArr, setTotalvaluesArr] = useState({})

    useEffect(() => {
        mapTreeValue(trees)
    }, [trees])


    const calculateValue = (tree) => {
        const { canopy, location, health } = tree
        const { typeValue } = tree.type
        return (+canopy + +typeValue + +location + +health)
    }

    const ValueColor = (tree) => {
        let sum = calculateValue(tree)
        if (sum <= 6) return 'lowPriority'
        else if (sum > 6 && 14 > sum) return 'mediumPriority'
        else if (sum > 13 && 17 > sum) return 'highPriority'
        else return 'veryHighPriority'
    }


    const getTotalvaluesArr = () => {
        return (
            {
                lowPriority: 0,
                mediumPriority: 0,
                highPriority: 0,
                veryHighPriority: 0
            }
        )
    }


    const mapTreeValue = (trees) => { // improve the code!
        let localTotalvaluesArr = getTotalvaluesArr()
        let typeObj = {}
        for (let i = 0; i < trees.length; i++) {
            let NTL = trees[i].type.label
            let value = ValueColor(trees[i])
            if (!typeObj.hasOwnProperty(NTL)) {
                let NTL = trees[i].type.label
                typeObj[NTL] = {
                    'highPriority': 0,
                    'lowPriority': 0,
                    'mediumPriority': 0,
                    'veryHighPriority': 0,
                    'total': 0
                }
            }
            ++localTotalvaluesArr[value]
            ++typeObj[NTL][value]
            ++typeObj[NTL]['total']
        }

        const treeKeys = Object.keys(typeObj)
        const objToArr = Object.values(typeObj)
        setTreeTypeObj(objToArr)
        setTreeTypeKeysArr(treeKeys)
        setTotalvaluesArr(localTotalvaluesArr)
    }

    return (
        <section className="trees-table flex">
            <table>
                <tr>
                    <th className="white">מין העץ/תאור
                        הפוליגון</th>
                    <th className="red">ערכיות גבוהה מאוד **</th>
                    <th className="green">ערכיות גבוהה **</th>
                    <th className="grey">ערכיות בינונית **</th>
                    <th className="yellow">ערכיות נמוכה **</th>
                    <th className="white">סה״כ</th>
                </tr>
                <tbody>
                    {treeTypeKeysArr && treeTypeObj?.map((tree, idx) => {
                        return (
                            <tr key={tree._id}>
                                {<td>{treeTypeKeysArr[idx]}</td>}
                                {<td>{tree['veryHighPriority']}</td>}
                                {<td>{tree['highPriority']}</td>}
                                {<td>{tree['mediumPriority']}</td>}
                                {<td>{tree['lowPriority']}</td>}
                                {<td>{tree['total']}</td>}
                            </tr>
                        )
                    })}
                    <tr key='total-values'>
                        {<td>סה״ב</td>}
                        {<td>{totalvaluesArr['veryHighPriority']}</td>}
                        {<td>{totalvaluesArr['highPriority']}</td>}
                        {<td>{totalvaluesArr['mediumPriority']}</td>}
                        {<td>{totalvaluesArr['lowPriority']}</td>}
                        {<td>{Object.values(totalvaluesArr).reduce((a, b) => a + b, 0)}</td>}
                    </tr>
                </tbody>
            </table>
        </section>
    )


}
