import React, { useEffect } from "react"




export const TreesTypesTable = ({ trees }) => {

    useEffect(() => {
        console.log('PROPS trees', trees);
        mapTreeValue(trees)
    }, [trees])


    const calculateValue = (tree) => {
        const { canopy, location, health } = tree
        const { typeValue } = tree.type
        return (+canopy + +typeValue + +location + +health)
    }

    const calculateMonetaryValue = (tree) => {
        let sum = (calculateValue(tree) / 5) * 20
        return sum
    }

    const ValueColor = (tree) => {
        let sum = calculateValue(tree)
        if (sum < 6) return 'ערכיות נמוכה'
        else if (sum > 6 && 12 < sum) return 'ערכיות בינונית'
        else if (sum > 13 && 17 < sum) return 'ערכיות גבוהה'
        else return 'גבוהה מאוד'
    }



    const mapTreeValue = (trees) => { // work on it
        let reduceTrees = trees.reduce(function (obj, name) {
            obj[name.type.label] = {}
            // obj[name.type.label] = {
            //     גבוהה מאוד:0,
            //     בערכיות גבוהה:0,
            //     grey:0,
            //     ערכיות נמוכה:0
            // }

            let field = ValueColor(name)
            obj[name.type.label][field] = obj[name.type.label][field] ? obj[name.type.label][field]++ : 1;

            // obj[name.type.label][field]++
            return obj;
        }, {});
        console.log('reduceTrees', reduceTrees);
    }

    // const mapTreeValue = (trees) => { // work on it
    //     let reduceTrees = trees.reduce(function (obj, name) {
    //         obj[name.type.BinomialNomenclature] = obj[name.type.BinomialNomenclature] ? ++obj[name.type.BinomialNomenclature] : 1;
    //         return obj;
    //     }, {});
    //     console.log('reduceTrees', reduceTrees);
    // }

    return (
        <section className="trees-table flex">
            <table>
                <tr>
                    <th>מין העץ/תאור
                        הפוליגון</th>
                    <th>גבוהה מאוד *ערכיות</th>
                    <th>**ערכיות גבוהה </th>
                    <th>בינונית ***ערכיות</th>
                    <th>נמוכה ****ערכיות</th>
                    <th>סה״כ</th>
                </tr>
                <tbody>
                    {trees?.map((tree) => {
                        return (
                            <tr key={tree._id}>
                                {tree.idx && <td>{tree.idx}</td>}
                                {/* <td>{tree.monetaryValue}</td> */}
                                <td>{tree.canopy}</td>
                                <td className={ValueColor(tree)}>{calculateValue(tree)}</td>
                                <td>{calculateMonetaryValue(tree)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </section>
    )


}
