import { FlexLayout, QWidget } from '@nodegui/nodegui';
import { PageAnnotationInputFile } from './inputFile';

export class PageAnnotationController {
  private _widget: QWidget;

  public get widget(): QWidget {
    return this._widget;
  }

  constructor() {
    this._widget = new QWidget();
    this._widget.setLayout(new FlexLayout());
    this._widget.setObjectName('rootView');
    this._widget.setStyleSheet(`
      #rootView {
        flex: 1;
        flex-direction: row;
        align-items: flex-start;
      }
    `);

    new PageAnnotationInputFile(this._widget);
  }
}
