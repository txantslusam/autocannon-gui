import fs from 'fs';
import store from '../redux/store';
import {Project} from "../redux/types";

export function saveStoreToFile(projects: Project[]) {
    fs.writeFile("store.json", JSON.stringify(projects), function(err) {
        if (err) {
            console.log(err);
        }
    });

}

export function readStoreFile() {
    const dataFromFile: Project[] = JSON.parse(fs.readFileSync("store.json").toString());
    return dataFromFile;
}