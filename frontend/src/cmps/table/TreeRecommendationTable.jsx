import React, { useEffect } from "react"

export function TreeRecommendationTable({ trees }) {


  useEffect(() => {
    console.log('trees', trees);
  }, [])
  const calculateValue = (tree) => {
    const { canopy, location, health } = tree
    const { typeValue } = tree.type
    return (+canopy + +typeValue + +location + +health)
  }

  // const calculateMonetaryValue = (tree) => {
  //     let sum = (calculateValue(tree) / 5) * 20
  //     return sum
  // }

  // const ValueColor = (tree) => {
  //   let sum = calculateValue(tree)
  //   if (sum <= 6) return 'lowPriority'
  //   else if (sum > 6 && 14 > sum) return 'mediumPriority'
  //   else if (sum > 13 && 17 > sum) return 'highPriority'
  //   else return 'veryHighPriority'
  // }


  const getTotalvaluesArr = () => {
    return (
      {
        preserve: 0,
        relocation: 0,
        amputation: 0,
        notDefined: 0,
        total: 0
      }
    )
  }

  const mapTreeValue = (trees) => { // improve the code!
    let localTotalvaluesArr = getTotalvaluesArr()
    let typeObj = {}
    for (let i = 0; i < trees.length; i++) {
      const { recommendation } = trees[i]
      // let value = ValueColor(trees[i])
      if (!typeObj.hasOwnProperty(recommendation)) {
        const { recommendation } = trees[i]
        // let NTL = trees[i].type.label
        typeObj[recommendation] = {
          'preserve': 0,
          'relocation': 0,
          'amputation': 0,
          'notDefined': 0,
          'total': 0
        }
      }
      ++localTotalvaluesArr[i]
      ++typeObj[recommendation][i]
      ++typeObj[recommendation]['total']
    }
  }

  return (
    <section className=''>

    </section>
  )
}