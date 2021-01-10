import {ProjectState} from "./types";


const initialState: ProjectState = {
    projects: [{
        "id":"39191594-f1c8-4a6e-839b-5178c623543e",
        "name":"New project",
        "tasks":[{
            "id":"16194cf3-74c7-4efe-b187-98c23b788e0a",
            "name":"New task",
            "method":"GET",
            results: {
                request: {
                    average: 123,
                    max: 150,
                    stdev: 123,
                },
               bytes: {
                   average: 123,
                   max: 150,
                   stdev: 123,
               },
               label: '251k requests in 10.05s, 27.9 MB read',
            }
        }]}],
};

export default initialState;