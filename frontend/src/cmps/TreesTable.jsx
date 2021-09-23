import React, { useEffect } from "react"




export const TreesTable = (...props) => {

    useEffect(() => {
        console.log('PROPS', props);
    }, [props])


    const { trees } = props

    return (
        <section className="trees-table flex">
            <table>
                <tr>
                    <th>מספר
                        העץ/פוליגון </th>
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
                </tr>
                <tbody>
                    {props[0].trees?.map((tree, idx) => {
                        return (
                            <tr key={tree._id}>
                                <td>{idx}</td>
                                <td>{tree.quantity}</td>
                                <td>{tree.height}</td>
                                <td>{tree.diameter}</td>
                                <td>{tree.health}</td>
                                <td>{tree.location}</td>
                                <td>{tree.monetaryValue}</td>
                                <td>{tree.canopy}</td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>


        </section>
    )


}
