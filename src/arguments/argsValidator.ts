import { Arguments } from './IArguments';

export function argsValidator(argv: Arguments, pdfPages: number): void {
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

  if (!argv.f.length) {
    console.error('Format has been overwritten to empty text!');

    process.exit(1);
  }

  if (argv.z > 10) {
    console.error('It is not possible to have more than 10 leading zeros!');

    process.exit(1);
  }

  if (argv.s !== undefined && argv.s > pdfPages) {
    console.error(
      'The start page is higher than available pages in the input PDF!'
    );

    process.exit(1);
  }

  if (argv.e !== undefined && argv.e > pdfPages) {
    console.warn(
      'The end page is higher than available pages in the input PDF. End page offset is ignored!'
    );
  }
}
