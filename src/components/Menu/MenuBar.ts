import { QMenuBar } from '@nodegui/nodegui';
import { FileMenu } from './FileMenu';

export class MenuBar extends QMenuBar {
  constructor() {
    super();

    this.initialize();
  }

  initialize() {
    const fileMenu = new FileMenu();

    this.addMenu(fileMenu);
  }
}
