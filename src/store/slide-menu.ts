export default ({
    'namespaced': true,
    'state': {
        'collapse': false,
        'defaultColor': '#4A47B8',
        'slideMenuConfig': {
            'background': '#EFEFF9',
            'textColor': '#333',
            'activeTextColor': '#4A47B8'
        }
    },
    'mutations': {
        handleCollapse(state: { collapse: boolean; }, data: boolean) {
            state.collapse = data;
        }
    }
});