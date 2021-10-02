import treeTypes from '../data/treeTypes.json';
import palmstreeTypes from '../data/palmstreeTypes.json';

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
    ,
    {
        value: 'notPossible',
        label: 'לא ניתן',

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
        value: 'notDefined',
        label: 'לא מוגדר',
    }

];

export const formService = {
    movingPossibility: movingPossibilityOptions,
    treeTypes,
    palmstreeTypes,
    recomandationOptions: recommendationOptions
}
