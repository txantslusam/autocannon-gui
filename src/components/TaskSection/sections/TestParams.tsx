import React from 'react';
import {SectionContainer} from "./Section.styled";
import Table from "../../Table/Table";

interface TestParamsProps {
    data: {[key: string]: any}[]
}

const TestParams: React.FC<TestParamsProps> = ({data}) => {
    return (
        <SectionContainer>
            <Table data={data}/>
        </SectionContainer>
    );
}

export default TestParams;