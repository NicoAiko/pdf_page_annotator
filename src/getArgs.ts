import yargs = require('yargs/yargs');
import { isInputOutputValid } from './fileValidator';

export interface Arguments {
  [x: string]: unknown;
  i: string;
  o: string;
  s?: number;
  e?: number;
  _: (string | number)[];
}

export async function getArgs(): Promise<Arguments> {
  const argv: Arguments = await yargs(process.argv.slice(2))
    .options({
      i: { type: 'string', demandOption: true, alias: 'input', description: 'Input PDF file name' },
      o: { type: 'string', demandOption: true, alias: 'output', description: 'Output PDF file name' },
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
    })
    .usage('Usage: $0 [options]')
    .example('$0 -i input.pdf -o output.pdf', 'Read a PDF file do magic and save as the output file')
    .example(
      '$0 -i input.pdf -o output.pdf -s 3 -e 10',
      'Read, do magic, write. Also start with Page 3 and stop at Page 10!'
    )
    .help('h')
    .alias('h', 'help')
    .epilog('Copyright 2021 - NicoAiko').argv;

  isInputOutputValid(argv);
  validateArgs(argv);

  return argv;
}

function validateArgs(argv: Arguments): void {
  if (argv.s !== undefined && argv.s < 1) {
    console.error('The start page must not be smaller than 1!');

    process.exit(1);
  }

  if (argv.e !== undefined && argv.e < 1) {
    console.error('The end page must not be smaller than 1!');

    process.exit(1);
  }

  if (argv.s !== undefined && argv.e !== undefined && argv.e < argv.s) {
    console.error('The end page must not be smaller than the start page!');

    process.exit(1);
  }
}
