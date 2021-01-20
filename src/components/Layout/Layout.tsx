import { Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import { readStoreFile } from '../../utils/utls';
import * as projectActions from '../../redux/actions';

const Layout: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const projects = readStoreFile();
    try {
      if (projects.length) {
        dispatch(projectActions.setProjects(projects));
      }
    } catch (e) {
      console.log('Can not read data from file');
    }
  }, []);
  return (
    <div>
      <Typography style={{ minHeight: '100vh', position: 'relative' }}>
        <Sidebar />
      </Typography>
    </div>
  );
};

export default Layout;
