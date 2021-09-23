import treTypes from '../data/treeTypes.json'


const trees = treTypes

const movingPossibility = [
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

export const formService = {
    movingPossibility,
    treTypes,
    trees
}
