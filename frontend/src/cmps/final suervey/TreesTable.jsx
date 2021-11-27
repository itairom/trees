import React, { useCallback, useEffect, useState } from "react"
import XLSX from 'xlsx';
import { saveAs } from 'file-saver'
import { useSelector } from "react-redux"
import { useHistory } from "react-router"
import useWindowSize from "../../services/customHooks"
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useDispatch } from "react-redux"
import { updateSurvey } from "../../actions/TreeActions"
import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


export const TreesTable = ({ trees }) => {

    const [isMobile, setIsMobile] = useState(false)
    const [draggableTrees, setDraggableTrees] = useState(trees)
    const { loggedInUser } = useSelector(state => state.appModule)
    const { survey } = useSelector(state => state.TreeModule)
    const [isMultipleDiameter, setIsMultipleDiameter] = useState(false)
    const windowSize = useWindowSize()
    const history = useHistory()
    const dispatch = useDispatch()

    const DataSet = [
        {
            columns: [
                { title: 'h1', style: { font: { bold: true } } },
                { title: 'h1', style: { font: { bold: true } } },
                { title: 'h1', style: { font: { bold: true } } },
                { title: 'h1', style: { font: { bold: true } } }
            ],
            data: [
                { value: 'abc' },
                { value: 'abc' },
                { value: 'abc' },
                { value: 'abc' }
            ]
        }


    ]

    useEffect(() => {
        if (trees) {
            setDraggableTrees(trees)
            checkMultipleDiameter()
        }
    }, [trees])


    useEffect(() => {
        windowSize.width < 500 ? setIsMobile(true) : setIsMobile(false)
    }, [windowSize])

    useEffect(() => {
        const survyCopy = { ...survey }
        survyCopy.surveyTrees = draggableTrees
        if (trees) dispatch(updateSurvey(survyCopy, loggedInUser))
    }, [draggableTrees])

    const checkMultipleDiameter = () => {
        trees.forEach(tree => { if (tree.diameter2 !== undefined) setIsMultipleDiameter(true) })
    }

    const sumTreeProperties = (tree) => {
        const { canopy, location, health } = tree
        const { typeValue } = tree.type
        return (+canopy + +typeValue + +location + +health)
    }

    const calculateTreeValue = (tree) => {
        const sum = (((tree.location * +tree.type.typeValue * tree.health) / 5) * (Math.pow((tree.diameter / 2), 2) * 3.14) / 5) * 20
        const total = (tree.quantity * sum)
        return total.toFixed(2)
    }


    const calculatePalmTreeValue = (tree) => {
        const sum = (tree.height * ((tree.location / 5 * +tree.type.typeValue / 5 * +tree.health / 5))) * 1500
        const total = tree.quantity * sum
        return total.toFixed(2)
    }


    const ValueColor = (tree) => {
        let sum = sumTreeProperties(tree)
        if (sum <= 6) return 'yellow'
        else if (sum > 6 && 14 > sum) return 'grey'
        else if (sum > 13 && 17 > sum) return 'green'
        else return 'red'
    }

    const recommendationColor = (recommendation) => {
        if (recommendation === 'כריתה') return 'yellow'
        if (recommendation === 'שימור') return 'red'
        if (recommendation === 'העתקה') return 'orange'
        else return 'blue'
    }

    const handleOnDragEnd = (result) => {
        if (!result.destination) return
        const items = Array.from(draggableTrees)
        const [reorderItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderItem)
        setDraggableTrees(items)
    }
    const removeTree = (treeId) => {
        const filterdArray = draggableTrees.filter((tree) => {
            return tree._id !== treeId
        })
        setDraggableTrees(filterdArray)

    }

    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    return (
        <section className="trees-table ">
            <table id="main-table">
                <thead>
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
                        {isMultipleDiameter && <th>*קוטר
                            גזע 2
                            (ס"מ)</th>}
                        {isMultipleDiameter && <th>*קוטר
                            גזע 3
                            (ס"מ)</th>}
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
                </thead>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="trees-desktop">
                        {(provided) => (
                            <tbody {...provided.droppableProps} ref={provided.innerRef}>
                                {draggableTrees?.map((tree, idx) => {
                                    return (
                                        <Draggable
                                            key={tree._id} draggableId={tree._id} index={idx}>
                                            {(provided) => (
                                                <tr
                                                    style={{
                                                        backgroundColor: 'red !important',
                                                        position: 'absolute'
                                                    }}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}>
                                                    {tree.idx &&
                                                        <td>{tree.idx}
                                                        </td>}
                                                    <td>{tree.type.label}</td>
                                                    <td>{tree.quantity}</td>
                                                    <td>{tree.height}</td>
                                                    <td>{tree.diameter}</td>
                                                    {isMultipleDiameter && <td>{tree.diameter2}</td>}
                                                    {isMultipleDiameter && <td>{tree.diameter3}</td>}
                                                    <td>{tree.health}</td>
                                                    <td>{tree.location}</td>
                                                    <td>{tree.type.typeValue}</td>
                                                    <td>{tree.canopy}</td>
                                                    <td className={ValueColor(tree)}>{sumTreeProperties(tree)}</td>
                                                    <td>{tree.rootsDiameter}</td>
                                                    {!tree.isPalmTree && <td>{calculateTreeValue(tree)}</td>}
                                                    {tree.isPalmTree && <td>{calculatePalmTreeValue(tree)}</td>}
                                                    <td>{tree.movingPossibility}</td>
                                                    <td>{tree.description}</td>
                                                    <td className={recommendationColor(tree.recommendation)}>{tree.recommendation}</td>
                                                    <td>{tree.movingReason}</td>
                                                    <td>

                                                        <div
                                                            onClick={() => { history.push(`tree_update/${tree._id}`) }}
                                                            className="edit-btn btn">עריכה</div >
                                                        <div
                                                            onClick={() => { removeTree(tree._id) }}
                                                            className="delete-btn btn">מחיקה</div >
                                                    </td>
                                                </tr>
                                            )}
                                        </Draggable>
                                    )
                                })}
                            </tbody>
                        )}
                    </Droppable>
                </DragDropContext >

            </table>
            <button
                className="download-table"
                onClick={() => {
                    let wb = XLSX.utils.table_to_book(document.querySelector('#main-table'), { sheet: 'sheetJs' })
                    let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' })



                    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), `סקר ${survey.surveyInfo.surveyTitle}.xlsx`);
                }}
            >הורדה</button>

            {/* <ExcelFile element={<button>Download Data With Styles</button>}>
                    <ExcelSheet dataSet={DataSet} name="Organization" />
                </ExcelFile> */}

            <section className="mobile-table">
                {trees?.map((tree, idx) => {
                    return (
                        <div className="mobile-tree-card" key={tree._id}>
                            <div className="flex">
                                <p>אינדקס</p>
                                <p>{tree.idx}</p>

                            </div>
                            <div className="flex">
                                <p>סוג עץ</p>
                                <p>{tree.type.label}</p>
                            </div>
                            <div className="flex">
                                <p> כמות</p>
                                <p>{tree.quantity}</p>
                            </div>
                            <div className="flex">
                                <p>גובה</p>
                                <p>{tree.height}</p>
                            </div>
                            <div className="flex">
                                <p>קוטר</p>
                                <p>{tree.diameter}</p>
                            </div>
                            {isMultipleDiameter && <div className="flex">
                                <p>קוטר 2</p>
                                <p>{tree.diameter2}</p>
                            </div>}
                            {isMultipleDiameter && <div className="flex">
                                <p>קוטר 3</p>
                                <p>{tree.diameter3}</p>
                            </div>}
                            <div className="flex">
                                <p>מצב בריאותי</p>
                                <p>{tree.health}</p>
                            </div>
                            <div className="flex">
                                <p>מיקום</p>
                                <p>{tree.location}</p>
                            </div>
                            <div className="flex">
                                <p>ערך עץ</p>
                                <p>{tree.type.typeValue}</p>
                            </div>
                            <div className="flex">
                                <p>ניקוד חופת עץ</p>
                                <p>{tree.canopy}</p>
                            </div>
                            <div className="flex">
                                <p>ערך עץ</p>
                                <p className={ValueColor(tree)}>{sumTreeProperties(tree)}</p>
                            </div>
                            <div className="flex">
                                <p>קוטר שורשרים</p>
                                <p>{tree.rootsDiameter}</p>
                            </div>
                            <div className="flex">
                                <p>שווי כספי</p>
                                {!tree.isPalmTree && <p>{calculateTreeValue(tree)}</p>}
                                {tree.isPalmTree && <p>{calculatePalmTreeValue(tree)}</p>}
                            </div>
                            <div className="flex">
                                <p>אפשרות העתקה</p>
                                <p>{tree.movingPossibility}</p>
                            </div>
                            <div className="flex">
                                <p>תיאור</p>
                                <p aria-multiline="true">{tree.description}</p>
                            </div>
                            <div className="flex">
                                <p>המלצה</p>
                                <p>{tree.recommendation}</p>
                            </div>
                            <div className="flex">
                                <p>סיבת העברה</p>
                                <p>{tree.movingReason}</p>
                            </div>
                            <div
                                onClick={() => { history.push(`tree_update/${tree._id}`) }}
                                className="edit-btn btn">עריכה</div >
                            <div
                                onClick={() => { removeTree(tree._id) }}
                                className="delete-btn btn">מחיקה</div >
                        </div>
                    )
                })

                }

            </section>
        </section >
    )


}

