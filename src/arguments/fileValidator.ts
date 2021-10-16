import FS from 'fs';
import { Arguments } from './IArguments';

export function isInputOutputValid(argv: Arguments): void {
  if (!FS.existsSync(argv.i)) {
    console.error('The input file does not exist!');

    process.exit(1);
  }

  if (FS.existsSync(argv.o)) {
    // Check if file is writable
    try {
      FS.openSync(argv.o, 'r+');
    } catch (error) {
      console.error(
        "The output file already exists and can't currently be written to. Is it opened somewhere?"
      );

      process.exit(1);
    }
  }
}
