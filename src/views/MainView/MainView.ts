import { FlexLayout, QWidget } from '@nodegui/nodegui';
import { IOWidget } from '../../components/IOWidget/IOWidget';

export class MainView extends QWidget {
  private _ioWidget = new IOWidget();

  constructor() {
    super();
    this.setObjectName('MainView');
    this.setLayout(new FlexLayout());

    this.initialize();
  }

  private initialize() {
    this.layout?.addWidget(this._ioWidget);

    const placeholder = new QWidget();
    placeholder.setObjectName('placeholder');

    this.layout?.addWidget(placeholder);
  }
}
