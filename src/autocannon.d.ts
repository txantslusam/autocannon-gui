import autocannon from 'autocannon';

declare module 'autocannon' {
  interface Result extends autocannon.Result {
    mismatches: number;
    resets: number;
  }
}
