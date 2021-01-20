import React from 'react';
import {
  Card, TableBody, TableCell, TableHead, TableRow, Table,
} from '@material-ui/core';
import autocannon from 'autocannon';
import prettyBytes from 'pretty-bytes';
import { ChartsArea, ResultsLabel, ResultTitle } from './Section.styled';
import { HdrChart } from '../../charts/hdr';

function format(num: number) {
  if (num < 1000) {
    return `${num}`;
  }
  return `${Math.round(num / 1000)}k`;
}

interface ResultSectionProps {
  results: autocannon.Result;
}

const ResultSection: React.FC<ResultSectionProps> = ({ results }) => (
  <>
    <Card style={{ margin: '1rem 0' }}>
      <Table>
        <TableHead>
          <TableCell>STATISTICS</TableCell>
          <TableCell align="right">1%</TableCell>
          <TableCell align="right">2.5%</TableCell>
          <TableCell align="right">50%</TableCell>
          <TableCell align="right">97.5%</TableCell>
          <TableCell align="right">AVERAGE</TableCell>
          <TableCell align="right">STANDARD DEVIATION</TableCell>
          <TableCell align="right">MAX</TableCell>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell style={{ fontWeight: 500 }}>REQUESTS PER SECONDS</TableCell>
            <TableCell align="right">{results.requests.p1}</TableCell>
            <TableCell align="right">{results.requests.p2_5}</TableCell>
            <TableCell align="right">{results.requests.p50}</TableCell>
            <TableCell align="right">{results.requests.p97_5}</TableCell>
            <TableCell align="right">{results.requests.average}</TableCell>
            <TableCell align="right">{results.requests.stddev}</TableCell>
            <TableCell align="right">{results.requests.max}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ fontWeight: 500 }}>BYTES PER SECONDS</TableCell>
            <TableCell align="right">{prettyBytes(results.throughput.p1)}</TableCell>
            <TableCell align="right">{prettyBytes(results.throughput.p2_5)}</TableCell>
            <TableCell align="right">{prettyBytes(results.throughput.p50)}</TableCell>
            <TableCell align="right">{prettyBytes(results.throughput.p97_5)}</TableCell>
            <TableCell align="right">{prettyBytes(results.throughput.average)}</TableCell>
            <TableCell align="right">{prettyBytes(results.throughput.stddev)}</TableCell>
            <TableCell align="right">{prettyBytes(results.throughput.min)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <br />
      <hr />
      <br />
      <Table>
        <TableHead>
          <TableCell>STATISTICS</TableCell>
          <TableCell align="right">1%</TableCell>
          <TableCell align="right">2.5%</TableCell>
          <TableCell align="right">50%</TableCell>
          <TableCell align="right">97.5%</TableCell>
          <TableCell align="right">AVERAGE</TableCell>
          <TableCell align="right">STANDARD DEVIATION</TableCell>
          <TableCell align="right">MIN</TableCell>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell style={{ fontWeight: 500 }}>Latency</TableCell>
            <TableCell align="right">{results.latency.p1}</TableCell>
            <TableCell align="right">{results.latency.p2_5}</TableCell>
            <TableCell align="right">{results.latency.p50}</TableCell>
            <TableCell align="right">{results.latency.p97_5}</TableCell>
            <TableCell align="right">{results.latency.average}</TableCell>
            <TableCell align="right">{results.latency.stddev}</TableCell>
            <TableCell align="right">{results.latency.min}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <br />
      <hr />
      <br />
      <ResultsLabel variant="subtitle1">
        { !!results.non2xx && (
        <>
          {/* @ts-ignore */}
          {`${results['2xx']} 2xx responses, ${results.non2xx} responses: ${results['1xx']} 1xx, ${results['3xx']} 3xx, ${results['4xx']} 4xx, ${results['5xx']} 5xx.`}
          <br />
        </>
        )}
        {`${results.requests.sent} requests in ${results.duration}s, ${prettyBytes(results.throughput.total)} read`}
        <br />
        {!!results.errors && (
        <>
          {`${format(results.errors)}  errors (${format(results.timeouts)}) timeouts)`}
          <br />
        </>
        )}
        {!!results.mismatches && (
        <>
          {`${format(results.mismatches)} requests with mismatched body`}
          <br />
        </>
        )}
        {!!results.resets && (
        <>
          {`Request pipeline was resetted ${format(results.resets)} ${results.resets === 1 ? 'time' : 'times'}`}
          <br />
        </>
        )}
      </ResultsLabel>

      <ChartsArea>
        <HdrChart data={[{
          name: 'Requests per second',
          data: results.requests,
        }]}
        />
        <HdrChart data={[{
          name: 'Bytes per second',
          data: results.throughput,
        }]}
        />
        <HdrChart data={[{
          name: 'Latency',
          data: results.latency,
        }]}
        />
      </ChartsArea>
    </Card>
  </>
);

export default ResultSection;
