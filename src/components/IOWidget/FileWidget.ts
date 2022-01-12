import {
  FileMode,
  FlexLayout,
  QFileDialog,
  QLabel,
  QPushButton,
  QWidget,
} from '@nodegui/nodegui';

export class FileWidget extends QWidget {
  _layout = new FlexLayout();

  private _label = new QLabel();
  private _browseButton = new QPushButton();
  private _fileDialog = new QFileDialog();

  constructor() {
    super();
    this.setLayout(this._layout);
    this.initialize();
  }

  public setBrowseButtonEventHandler(
    callback: (value: string[] | false) => void
  ) {
    this._browseButton.addEventListener('clicked', () => {
      const dialog = this._fileDialog.exec();

      if (dialog) {
        callback(this._fileDialog.selectedFiles());
      } else {
        callback(false);
      }
    });
  }

  public setLabelText(value: string): void {
    this._label.setText(value);
  }

  private initialize() {
    this._fileDialog.setNameFilter('PDF documents (*.pdf)');
    this._fileDialog.setFileMode(FileMode.ExistingFile);

    this._browseButton.setText('Select file ...');

    this._layout.addWidget(this._label);
    this._layout.addWidget(this._browseButton);
  }
}
