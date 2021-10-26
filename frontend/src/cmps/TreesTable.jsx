import React, { useEffect } from "react"
import ReactToExcel from 'react-html-table-to-excel'
import { useHistory } from "react-router"

export const TreesTable = ({trees}) => {

    const history =useHistory()
    useEffect(() => {
        console.log(trees);
    }, [trees])

    const calculateValue = (tree) => {
        const { canopy, location, health } = tree
        const { typeValue } = tree.type
        return (+canopy + +typeValue + +location + +health)
    }

    // const calculateMonetaryValue = (tree) => {
    //     let sum = (calculateValue(tree) / 5) * 20
    //     return sum
    // }

    const calculateTreeValue = (tree) => {
        const sum = (((tree.location * +tree.type.typeValue * tree.health) / 5) * (Math.pow((tree.diameter / 2), 2) * 3.14) / 5) * 20
        return tree.quantity * sum.toFixed(2)
    }

    const calculatePalmTreeValue = (tree) => {
        const sum = (tree.height * ((tree.location / 5 * +tree.type.typeValue / 5 * +tree.health / 5))) * 1500
        return tree.quantity * sum.toFixed(2)
    }

    const ValueColor = (tree) => {
        let sum = calculateValue(tree)
        if (sum <= 6) return 'yellow'
        else if (sum > 6 && 14 > sum) return 'grey'
        else if (sum > 13 && 17 > sum) return 'green'
        else return 'red'
    }

    return (
        <section className="trees-table ">

            <table id="main-table">
                <tr>
                    <th>מספר
                        העץ/פוליגון </th>
                    <th>מין העץ/תאור
                        הפוליגון</th>
                    <th>כמות עצים</th>
                    <th>**גובה
                        העץ
                        (מ')</th>
                    <th>*קוטר
                        גזע
                        (ס"מ)</th>
                    <th>מצב
                        בריאותי
                        (0-5)</th>
                    <th>מיקום
                        העץ
                        (0-5)</th>
                    <th>ערך
                        מין
                        העץ
                        (0-5)</th>
                    <th>ניקוד
                        חופת
                        העץ
                        (0-5)</th>
                    <th>סך ערכיות
                        העץ/פוליגון
                        (0-20)</th>
                    <th>***אזור
                        שורשים
                        מוגן
                        רדיוס
                        במ'</th>
                    <th>שווי
                        העצים ב
                        ₪</th>
                    <th>היתכנות העתקה </th>
                    <th>הערות</th>
                    <th>המלצות</th>
                    <th>סיבת כריתה או העתקת העץ</th>
                </tr>
                <tbody>
                    {trees?.map((tree) => {
                        return (
                            <tr key={tree._id}>
                                {tree.idx && <td>{tree.idx}</td>}
                                <td>{tree.type.label}</td>
                                <td>{tree.quantity}</td>
                                <td>{tree.height}</td>
                                <td>{tree.diameter}</td>
                                <td>{tree.health}</td>
                                <td>{tree.location}</td>
                                <td>{tree.type.typeValue}</td>
                                <td>{tree.canopy}</td>
                                <td className={ValueColor(tree)}>{calculateValue(tree)}</td>
                                <td>{tree.rootsDiameter}</td>
                                {!tree.isPalmTree && <td>{calculateTreeValue(tree)}</td>}
                                {tree.isPalmTree && <td>{calculatePalmTreeValue(tree)}</td>}
                                <td>{tree.movingPossibility}</td>
                                <td>{tree.description}</td>
                                <td>{tree.recommendation}</td>
                                <td>{tree.movingReason}</td>
                                <div
                                    onClick={() => {history.push(`tree_update/${tree._id}`) }}
                                    className="edit-btn btn">עריכה</div >
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <ReactToExcel
                className="download-table "
                table="main-table"
                filename="טבלת סקר עצים"
                sheet="טבלת סקר עצים"
                buttonText="הורדה"
            />
        </section>
    )


}
