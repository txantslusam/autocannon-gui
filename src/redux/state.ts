import {ProjectState} from "./types";


const initialState: ProjectState = {
    projects: [{
        id: '1',
        name: 'Maciejowy projekt',
        tasks: [{
            id: '1',
            header: [{
                key: 'Bearer token',
                value: '123'
            }],
            name: 'Maciejowy Task 1',
            params: [{
                key: '',
                value: '',
            }],
            testParams: [{
                key: '',
                value: '',
            }]
        }]
    }]
};

export default initialState;