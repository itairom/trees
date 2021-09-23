import React, { useEffect, useState } from 'react'
import { TreesTable } from '../cmps/TreesTable';
import { treeService } from '../services/treeService';



export const TreesSurvey = () => {




    let [trees, setTrees] = useState([])

    useEffect(() => {

        async function queryTrees() {
            setTrees(await treeService.query())

        }
        queryTrees()

        console.log('🌲', trees);

    }, [])


    return (

        <section className="main-container trees-survey flex">
            <TreesTable trees={trees} />
        </section>


    )

}