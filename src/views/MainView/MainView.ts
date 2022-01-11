import {
  Direction,
  QBoxLayout,
  QLabel,
  QLineEdit,
  QPushButton,
  QWidget,
} from '@nodegui/nodegui';

export class MainView extends QWidget {
  constructor() {
    super();
    this.setObjectName('MainView');
    this.setLayout(new QBoxLayout(Direction.TopToBottom));

    this.initialize();
  }

  private initialize() {
    const startPageLabel = new QLabel(this);
    startPageLabel.setText('Start page');

    const startPageField = new QLineEdit(this);

    const executeAnnotation = new QPushButton(this);
    executeAnnotation.setText('Start annotation');

    this.layout?.addWidget(startPageLabel);
    this.layout?.addWidget(startPageField);
    this.layout?.addWidget(executeAnnotation);
  }
}
