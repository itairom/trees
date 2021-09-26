import treeTypes from '../data/treeTypes.json';

//  const treeTypes = [
//     {
//         typeValue: "3",
//         BinomialNomenclature: " Persea americana",
//         label: "אבוקדו אמריקני (זנים שונים)"
//     },
//     {
//         typeValue: "3",
//         BinomialNomenclature: "Juglans regia ",
//         label: "אגוז המלך "
//     }
// ]


const movingPossibilityOptions = [
    {
        value: 'hign',
        label: 'גבוהה',
    },
    {
        value: 'medium',
        label: 'בינונית',
    },
    {
        value: 'low',
        label: 'נמוכה',

    }
];
const recommendationOptions = [
    {
        value: 'preserve',
        label: 'שימור',
    },
    {
        value: 'relocation',
        label: 'העתקה',
    },
    {
        value: 'amputation',
        label: 'כריתה',
    },
    {
        value: 'notPossible',
        label: 'לא ניתן',
    }

];

export const formService = {
    movingPossibility: movingPossibilityOptions,
    treeTypes,
    recomandationOptions: recommendationOptions
}
