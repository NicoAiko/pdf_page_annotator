import { MainWindow } from './MainWindow';

function main() {
  const window = new MainWindow();
  window.show();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).win = window;
}

main();
