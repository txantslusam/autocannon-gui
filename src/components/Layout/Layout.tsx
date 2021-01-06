import {Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react"
import Sidebar from '../Sidebar/Sidebar';

interface LayoutProps {
    isSticky?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, isSticky }) => {

    useEffect(() => {

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
