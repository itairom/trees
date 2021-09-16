import React, { useEffect, useState } from 'react'
import XLSX from 'xlsx'
import { saveAs } from 'file-saver'


export const Sheet = ({data}) => {
    
    const [sheet, setSheet] = useState('')
    const [form, setForm] = useState({"1":"1"})
    
    useEffect(() => {
    }, [form])
    
    
    const submitForm = (ev) => {
        console.log(data);
        const JsonForm = JSON.stringify(data)
        console.log("🚀 ~ file: Sheet.jsx ~ line 19 ~ submitForm ~ JsonForm", JsonForm)
        setForm(JsonForm)
        createSheet()
    }
    
    const createSheet = () => {
        console.log('create sheet');
        const date = new Date(Date.now())
        let localSheet = XLSX.utils.book_new()
        // let data = [['hello', 'frienf'], ['bomba', 'shen']]
        localSheet.Props = {
            Title: 'New Sheet',
            CreatedDate: date.getDate().toString()
        }
        localSheet.SheetNames.push('New')
        console.log("🚀 ~ file: Sheet.jsx ~ line 1 ~ createSheet ~ form", form)
        
        let dts = XLSX.utils.json_to_sheet(form)
        // let dts = XLSX.utils.aoa_to_sheet(data)
        localSheet.Sheets['New'] = dts
        let exports = XLSX.write(localSheet, { bookType: 'xlsx', type: 'binary' });
        setSheet(exports)
    }

    const exportBinary = (s) => {
        var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
        var view = new Uint8Array(buf);  //create uint8array as viewer
        for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
        return buf;
    }

    const saveToFile = () => {
        saveAs(new Blob([exportBinary(sheet)], { type: "application/octet-stream" }), 'test.xlsx');
    }

    return (
        <section>
            <h1>sheet</h1>
            <button onClick={() => { saveToFile() }}>excel test</button>
            <button onClick={(ev) => { submitForm(ev) }}>Submit</button>
        </section>
    )
}