import { QAction, QApplication, QKeySequence, QMenu } from '@nodegui/nodegui';

export class FileMenu extends QMenu {
  constructor() {
    super();

    this.initialize();
  }

  initialize() {
    const exitAction = new QAction();
    exitAction.setText('&Exit');
    exitAction.setShortcut(new QKeySequence('CTRL+Q'));
    exitAction.addEventListener('triggered', () => {
      QApplication.instance().quit();
    });

    this.setTitle('File');
    this.addAction(exitAction);
  }
}
