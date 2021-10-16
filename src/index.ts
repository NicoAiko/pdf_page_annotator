import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import FS from 'fs';
import util from 'util';
import { argsValidator, isInputOutputValid, getArgs } from './arguments';

async function main() {
  const argv = await getArgs();

  // Validate input/output files
  isInputOutputValid(argv);

  console.log('Loading file...');
  const inputFile = FS.readFileSync(argv.i);

  console.log('Parsing...');
  const doc = await PDFDocument.load(inputFile);

  console.log('Preparing font...');
  const helveticaFont = await doc.embedFont(StandardFonts.Helvetica);

  console.log('Reading amount of pages...');
  const pages = doc.getPages();
  console.log(`Found ${pages.length} page${pages.length === 1 ? '' : 's'}`);

  console.log('Validating given options...');
  argsValidator(argv, pages.length);

  const startOffset = argv.s ?? 1;
  const endOffset = argv.e ?? pages.length;
  let pageIndex = 1;
  let pageNumber = 1;

  console.log(
    `Annotating starts at page ${startOffset} and stops at page ${endOffset}.`
  );

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
    const leadingZeroText = pageNumber.toString().padStart(argv.z + 1, '0');
    const numberText = util.format(argv.f, leadingZeroText);
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
