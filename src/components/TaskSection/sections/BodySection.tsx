import React from 'react';
import {SectionContainer} from "./Section.styled";
// @ts-ignore
import { JsonEditor as Editor } from 'jsoneditor-react';

interface BodySectionProps {

}

const BodySection: React.FC<BodySectionProps> = () => {


    // set json
    const initialJson = {
        "Array": [1, 2, 3],
        "Boolean": true,
        "Number": 123,
        "Object": {"a": "b", "c": "d"},
        "String": "Hello World"
    }

    return (
        <SectionContainer>
            <Editor
                mode='code'
                value={initialJson}
            />
        </SectionContainer>

    );
}

export default BodySection;