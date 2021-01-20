import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Accordion, AccordionDetails, AccordionSummary, Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ResultSection from '../TaskSection/sections/ResultSection';
import { HdrChart } from '../charts/hdr';
import { ChartsArea } from '../TaskSection/sections/Section.styled';
import { BarChart } from '../charts/Bar';

const ResultsSection: React.FC = () => {
  const { projects } = useSelector(state => state.project);
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find(storedProject => storedProject.id === projectId);
  const projectTasksWithResults = projects.find(storedProject => storedProject.id === projectId).tasks.filter(task => task.results?.requests);

  return (
    <div>
      <h1>Aggregated results</h1>
      {projectTasksWithResults.map((task) => {
        if (task.results) {
          return (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${task.name}-content`}
                id={`${task.name}-header`}
              >
                <Typography variant="subtitle1">{task.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ResultSection results={task.results} />
              </AccordionDetails>
            </Accordion>
          );
        }

        return <></>;
      })}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="summary-content"
          id="summary-header"
        >
          <Typography variant="subtitle1">Summary</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ChartsArea>
            <HdrChart
              title="Requests per second"
              data={projectTasksWithResults.map(task => ({
                name: task.name,
                data: task.results.requests,
              }))}
            />
            <HdrChart
              title="Bytes per second"
              data={projectTasksWithResults.map(task => ({
                name: task.name,
                data: task.results.throughput,
              }))}
            />
            <HdrChart
              title="Latency"
              data={projectTasksWithResults.map(task => ({
                name: task.name,
                data: task.results.latency,
              }))}
            />
            <BarChart
              title="Average requests per second"
              data={{
                labels: projectTasksWithResults.map(task => task.name),
                values: projectTasksWithResults.map(task => task.results.requests.average),
              }}
            />
            <BarChart
              title="Average bytes per second"
              data={{
                labels: projectTasksWithResults.map(task => task.name),
                values: projectTasksWithResults.map(task => task.results.throughput.average),
              }}
            />
            <BarChart
              title="Average latency"
              data={{
                labels: projectTasksWithResults.map(task => task.name),
                values: projectTasksWithResults.map(task => task.results.latency.average),
              }}
            />
          </ChartsArea>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ResultsSection;
