const PDFDocument = require('pdfkit');
const fs = require('fs');

function buildAnimalsPDF(filename, id) {
    let names = []
    // const doc = new PDFDocument(`pdf/${filename}`);
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(`pdf/${filename}`));
    fs.readdirSync(`images/${id}`).forEach((file, idx) => {
        // doc.text(`Photo ${idx}`,100,280 + 300 * idx);
        doc.image(`images/${id}/${file}`, {
            fit: [100, 300 + 300 * idx],
            // fit: [250, 300 + 200 * (++idx)],
            align: "center",
            valign: "center",
        });
    });

    console.log("🚀 ~ file: pdf.service.js ~ line 7 ~ buildAnimalsPDF ~ names", names)
    // names.forEach((file, idx) => {
    //     doc.image(file, {
    //         fit: [250, 300 + 200 * idx],
    //         align: "center",
    //         valign: "center",
    //     });
    // })

    doc.end();
}

module.exports = {
    buildAnimalsPDF,
};
