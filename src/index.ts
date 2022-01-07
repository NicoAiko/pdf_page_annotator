import { PDFPageAnnotatorWindow } from './UI/window';

function main() {
  const window = new PDFPageAnnotatorWindow();
  window.show();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).win = window.window;
}

main();
