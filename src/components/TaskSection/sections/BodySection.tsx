import React, {useEffect, useRef, useState} from 'react';
import {SectionContainer} from "./Section.styled";
// @ts-ignore
import { JsonEditor as Editor } from 'jsoneditor-react';
import {Param, Task} from "../../../redux/types";
import * as projectActions from "../../../redux/actions";
import {useDispatch} from "react-redux";
import 'jsoneditor-react/es/editor.min.css';

interface BodySectionProps {
    projectId: string;
    task: Task;
}

const BodySection: React.FC<BodySectionProps> = ({ task, projectId}) => {
    const dispatch = useDispatch();
    const editorRef = useRef(null);
    const [body, setBody] = useState();
    useEffect(() => {
        setBody(task.body);
        if (editorRef.current) {
            editorRef.current.jsonEditor.update(task.body || null);
        }
    }, [task.body, task.id, editorRef.current])

    const handleOnChangeBody = (json: any) => {
        const currentTask = {...task};
        currentTask.body = json;
        dispatch(projectActions.editTaskInProject(projectId, currentTask));
    }

    return (
        <SectionContainer>
            <Editor
                ref={editorRef}
                mode='code'
                value={body || null}
                onChange={handleOnChangeBody}
            />
        </SectionContainer>

    );
}

export default BodySection;