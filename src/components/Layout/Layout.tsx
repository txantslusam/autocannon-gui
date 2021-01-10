import {Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react"
import Sidebar from '../Sidebar/Sidebar';
import {readStoreFile} from "../../utils/utls";
import * as projectActions from '../../redux/actions';
import {useDispatch} from "react-redux";
import store from "../../redux/store";

interface LayoutProps {
    isSticky?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, isSticky }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const projects = readStoreFile();
        try {
            if (projects.length) {
                dispatch(projectActions.setProjects(projects));
            }
        } catch (e) {
            console.log('Can not read data from file')
        }
    }, []);
    return (
        <div >
            <Typography style={{minHeight: '100vh', position: 'relative'}}>
                <Sidebar />
            </Typography>
        </div>
    )
};

export default Layout;
