//Эмуляция бекэнда
const mockApiData = [
    {
        id: 1,
        name: 'Enter Sandman'
    },
    {
        id: 2,
        name: 'Hello 1'
    },
    {
        id: 3,
        name: 'Hello 3'
    },
    {
        id: 4,
        name: 'Hello 4'
    },
    {
        id: 5,
        name: 'Hello 5'
    }
];

export const getTracks = () => dispatch => {
    const div = document.createElement('div');
    const list = document.getElementById('list');

    div.innerHTML = 'Wait for server response simulation...';

    list.parentElement.insertBefore(div, list);

    dispatch({type: 'FETCH_TRACK'});

    setTimeout(() => {
        console.log('I got tracks');
        dispatch({type: 'FETCH_TRACK_SUCCESS', payload: mockApiData});
        div.remove();
    }, 2000)
};