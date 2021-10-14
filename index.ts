import yargs = require('yargs/yargs');
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import FS from 'fs';

interface Arguments {
  [x: string]: unknown;
  i: string;
  o: string;
  s?: number;
  e?: number;
  _: (string | number)[];
}

async function main() {
  const argv: Arguments = await yargs(process.argv.slice(2))
    .options({
      i: { type: 'string', demandOption: true, alias: 'input', description: 'Input PDF file name' },
      o: { type: 'string', demandOption: true, alias: 'output', description: 'Output PDF file name' },
      s: { type: 'number', demandOption: false, alias: 'start-page', description: 'Page of the PDF where counting should start (inclusive!). If omitted, the first page of the PDF is used.' },
      e: { type: 'number', demandOption: false, alias: 'end-page', description: 'Page of the PDF where counting should end (inclusive!). If omitted, the last page of the PDF is used.' },
    })
    .usage('Usage: $0 [options]')
    .example('$0 -i input.pdf -o output.pdf', 'Read a PDF file do magic and save as the output file')
    .example('$0 -i input.pdf -o output.pdf -s 3 -e 10', 'Read, do magic, write. Also start with Page 3 and stop at Page 10!')
    .help('h')
    .alias('h', 'help')
    .epilog('Copyright 2021 - NicoAiko')
    .argv;


  if (!FS.existsSync(argv.i)) {
    console.error('The input file does not exist!');

    process.exit(1);
  }

  if (FS.existsSync(argv.o)) {
    // Check if file is writable
    try {
      FS.openSync(argv.o, 'r+');
    } catch (error) {
      console.error('The output file already exists and can\'t currently be written to. Is it opened somewhere?');

      process.exit(1);
    }
  }

  if (argv.s !== undefined && argv.s < 1) {
    console.error('The start page must not be smaller than 1!');

    process.exit(1);
  }

  if (argv.e !== undefined && argv.e < 1) {
    console.error('The end page must not be smaller than 1!');

    process.exit(1);
  }

  if ((argv.s !== undefined && argv.e !== undefined) && argv.e < argv.s) {
    console.error('The end page must not be smaller than the start page!');

    process.exit(1);
  }

  console.log('Loading file...');
  const inputFile = FS.readFileSync(argv.i);

  console.log('Parsing...');
  const doc = await PDFDocument.load(inputFile);

  console.log('Preparing font...');
  const helveticaFont = await doc.embedFont(StandardFonts.Helvetica);

  console.log('Reading amount of pages...');
  const pages = doc.getPages();
  console.log(`Found ${pages.length} page${pages.length === 1 ? '' : 's'}`);

  if (argv.s !== undefined && argv.s > pages.length) {
    console.error('The start page is higher than available pages in the input PDF!');

    process.exit(1);
  }

  if (argv.e !== undefined && argv.e > pages.length) {
    console.warn('The end page is higher than available pages in the input PDF. End page offset is ignored!');
  }

  const startOffset = argv.s ?? 1;
  const endOffset = argv.e ?? pages.length;
  let pageIndex = 1;
  let pageNumber = 1;

  console.log(`Annotating starts at page ${startOffset} and stops at page ${endOffset}.`);

  for (const page of pages) {
    // Outside of offset
    if (pageIndex < startOffset) {
      pageIndex++;
      continue;
    }

    if (pageIndex > endOffset) {
      break;
    }

    const { width } = page.getSize();
    const numberText = `Page ${pageNumber.toString().padStart(3, '0')}`;
    const textWidth = helveticaFont.widthOfTextAtSize(numberText, 12);
    const textHeight = helveticaFont.heightAtSize(12);
    const x = width - 20 - textWidth;
    const y = 20 + textHeight;

    console.log(`Annotating ${numberText}...`);

    page.drawText(numberText, {
      x,
      y,
      size: 12,
      font: helveticaFont,
      color: rgb(1, 0, 0),
    });

    pageNumber++;
    pageIndex++;
  }

  console.log('Saving to output...');
  const pdfBytes = await doc.save();

  FS.writeFileSync(argv.o, pdfBytes);
}

main();
