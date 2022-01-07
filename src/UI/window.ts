import { QMainWindow, QWidget } from '@nodegui/nodegui';
import { PageAnnotationController } from './PageAnnotation/controller';

export class PDFPageAnnotatorWindow {
  private _window: QMainWindow;

  public get window(): QMainWindow {
    return this._window;
  }

  constructor() {
    this._window = new QMainWindow();
    this._window.setWindowTitle('PDF Page Annotator');
    this._window.setMinimumSize(640, 480);

    // Initial load
    const pageAnnotationController = new PageAnnotationController();
    this.setWidget(pageAnnotationController.widget);
  }

  setWidget(widget: QWidget): void {
    this._window.setCentralWidget(widget);
  }

  show(): void {
    this._window.show();
  }
}
