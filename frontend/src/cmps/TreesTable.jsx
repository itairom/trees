import React, { useEffect } from "react"




export const TreesTable = (...props) => {

    useEffect(() => {
        console.log('PROPS', props);
    }, [props])


    const calculateValue = (tree) => {
        const { canopy, monetaryValue, location, health } = tree
        return (canopy + monetaryValue + location + health)
    }

    const calculateMonetaryValue = (tree) => {
        const { canopy, monetaryValue, location, health } = tree
        let sum = ((canopy + monetaryValue + location + health) / 5) * 20
        return sum
    }

    const ValueColor = (tree) => {
        let sum = calculateValue(tree)
        if (sum < 6) return 'yellow'
        else if (sum > 6 && 12 < sum) return 'grey'
        else if (sum > 13 && 17 < sum) return 'green'
        else return 'red'
    }

    return (
        <section className="trees-table flex">
            <table>
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
                    {props[0].trees?.map((tree) => {
                        return (
                            <tr key={tree._id}>
                                {tree.idx && <td>{tree.idx}</td>}
                                <td>{tree.type}</td>
                                <td>{tree.quantity}</td>
                                <td>{tree.height}</td>
                                <td>{tree.diameter}</td>
                                <td>{tree.health}</td>
                                <td>{tree.location}</td>
                                <td>{tree.monetaryValue}</td>
                                <td>{tree.canopy}</td>
                                <td className={ValueColor(tree)}>{calculateValue(tree)}</td>
                                <td>{tree.rootsDiameter}</td>
                                <td>{calculateMonetaryValue(tree)}</td>
                                <td>{tree.movingPossibility}</td>
                                <td>{tree.description}</td>
                                <td>כריתה</td>
                                <td>{tree.movingReason}</td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>


        </section>
    )


}
