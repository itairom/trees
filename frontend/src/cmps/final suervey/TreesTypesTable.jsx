import React, { memo,  useEffect, useState } from "react"

const TreesTypesTable = ({ trees }) => {

    const [treeTypeObj, setTreeTypeObj] = useState([])
    const [treeTypeKeysArr, setTreeTypeKeysArr] = useState([])
    const [totalvaluesArr, setTotalvaluesArr] = useState({})

    useEffect(() => {
        // callbackMapTreeValue(trees)
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
        for (let i = 0; i < trees?.length; i++) {
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

    // const callbackMapTreeValue = useCallback((trees) => {
    //     mapTreeValue(trees)
    // }, [trees])
    return (
        <section className="trees-table flex">
            <table>
                <thead>
                    <tr key="tree-type-header">
                        <th className="white">?????? ??????/????????
                            ????????????????</th>
                        <th className="red">???????????? ?????????? ???????? **</th>
                        <th className="green">???????????? ?????????? **</th>
                        <th className="grey">???????????? ?????????????? **</th>
                        <th className="yellow">???????????? ?????????? **</th>
                        <th className="white">????????</th>
                    </tr>
                </thead>
                <tbody>
                    {treeTypeKeysArr && treeTypeObj?.map((tree, idx) => {
                        return (
                            <tr key={'tree-type-' + idx}>
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
                        {<td>????????</td>}
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
export const MemoTreesTypesTable = memo(TreesTypesTable)

