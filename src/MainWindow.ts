import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import path from 'path';
import { QMainWindow, QStackedWidget, WidgetAttribute } from '@nodegui/nodegui';
import { MenuBar } from './components/Menu/MenuBar';
import { MainView } from './views/MainView/MainView';

export class MainWindow extends QMainWindow {
  private root = new QStackedWidget(this);
  private mainView = new MainView();

  constructor() {
    super();
    void this.loadStyles();
    this.loadIcon();
    this.initializeWindow();
  }

  async loadStyles() {
    const stylePath = path.join(__dirname, 'themes', 'theme.css');

    if (!existsSync(stylePath)) {
      return;
    }

    try {
      const stylesheet = await readFile(stylePath, 'utf-8');

      this.setStyleSheet(stylesheet);
    } catch (e) {
      console.error("Couldn't load the stylesheet.", e);
    }
  }

  protected initializeWindow() {
    const menuBar = new MenuBar();

    this.setWindowTitle('PDF Page Annotator');
    this.setObjectName('RootWindow');
    this.setMinimumSize(640, 480);
    this.setAttribute(WidgetAttribute.WA_AlwaysShowToolTips, true);
    this.setCentralWidget(this.root);
    this.setMenuBar(menuBar);

    this.root.addWidget(this.mainView);

    this.root.setCurrentWidget(this.mainView);
  }

  protected loadIcon() {
    // const icon = new QIcon();
    // this.setWindowIcon();
  }
}
