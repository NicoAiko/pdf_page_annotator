import Yargs from 'yargs';
import yargs = require('yargs/yargs');
import { Arguments } from './IArguments';

export async function getArgs(): Promise<Arguments> {
  return yargs(process.argv.slice(2))
    .options({
      i: {
        type: 'string',
        demandOption: true,
        alias: 'input',
        description: 'Input PDF file name',
      },
      o: {
        type: 'string',
        demandOption: true,
        alias: 'output',
        description: 'Output PDF file name',
      },
      s: {
        type: 'number',
        demandOption: false,
        alias: 'start-page',
        description:
          'Page of the PDF where counting should start (inclusive!). If omitted, the first page of the PDF is used.',
      },
      e: {
        type: 'number',
        demandOption: false,
        alias: 'end-page',
        description:
          'Page of the PDF where counting should end (inclusive!). If omitted, the last page of the PDF is used.',
      },
      f: {
        type: 'string',
        demandOption: false,
        alias: 'format',
        description:
          'Changes the format of the text that should be rendered on each page. Will use util.format function to calculate the text.',
        default: 'Page %s',
      },
      z: {
        type: 'number',
        demandOption: false,
        alias: 'leading-zeros',
        description:
          'The amount of leading zeros that should be used for the page number.',
        default: 2,
      },
    })
    .usage('Usage: $0 [options]')
    .example(
      '$0 -i input.pdf -o output.pdf',
      'Read a PDF file do magic and save as the output file'
    )
    .example(
      '$0 -i input.pdf -o output.pdf -s 3 -e 10',
      'Read, do magic, write. Also start with Page 3 and stop at Page 10!'
    )
    .example(
      '$0 -i input.pdf -0 output.pdf -f "Seite %s" -z 0',
      'Sets the format to "Seite X" with no leading zeros.'
    )
    .help('h')
    .alias('h', 'help')
    .epilog('Copyright 2021 - NicoAiko')
    .wrap(Yargs.terminalWidth()).argv;
}
