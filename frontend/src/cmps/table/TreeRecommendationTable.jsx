import React, { useEffect, useState } from "react"

export function TreeRecommendationTable({ trees }) {

  const [recommendationTable, setRecommendationTable] = useState({

  })

  useEffect(() => {
    sumRecommendations()
  }, [trees])

  useEffect(() => {
  }, [recommendationTable])

  const recLabelConvert = (rec) => {
    switch (rec) {
      case 'שימור':
        return 'preserve'
      case 'העתקה':
        return 'relocation'
      case 'כריתה':
        return 'amputation'
      default:
        return 'אינו מוגדר עץ בוגר'
    }
  }

  const sumRecommendations = () => {
    const recArr = {
      preserve: 0,
      relocation: 0,
      amputation: 0,
      notDefined: 0,
      total: 0
    }
    if (trees) {
      trees.forEach(tree => {
        const rec = recLabelConvert(tree.recommendation)
        recArr[rec]++
        recArr.total++
      })
      setRecommendationTable(recArr)
    }
  }


  const numToPercentage = (type) => {
    const res = (((type / trees?.length) * 100).toFixed(0))
    return (res + '%')
  }

  return (
    <section className='tree-recommendation-table trees-table flex cloumn'>

      <table>
        <thead className="green">
          <tr className="green" key="">
            <th >המלצה</th>
            <th >מס׳ עצים</th>
            <th >סה״כ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>סה״כ עצים לשימור</td>
            <td>{recommendationTable.preserve}</td>
            <td>{numToPercentage(recommendationTable.preserve)}</td>
          </tr>
          <tr>
            <td>סה״כ עצים להעתקה</td>
            <td>{recommendationTable.relocation}</td>
            <td>{numToPercentage(recommendationTable.relocation)}</td>
          </tr>
          <tr>
            <td>סה״כ עצים לכריתה</td>
            <td>{recommendationTable.amputation}</td>
            <td>{numToPercentage(recommendationTable.amputation)}</td>
          </tr>
          <tr>
            <td>סה"כ עצים בוגרים בשטח</td>
            <td>{recommendationTable.total}</td>
            <td>{numToPercentage(recommendationTable.total)}</td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}