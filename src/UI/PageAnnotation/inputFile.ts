import {
  FileMode,
  QFileDialog,
  QLabel,
  QPushButton,
  QWidget,
} from '@nodegui/nodegui';

export class PageAnnotationInputFile {
  private _button: QPushButton;
  private _label: QLabel;
  private _widget: QWidget;

  constructor(widget: QWidget, labelText?: string, buttonText?: string) {
    this._widget = widget;

    this._label = new QLabel();
    this._label.setText(labelText ?? 'File:');
    this._widget.layout?.addWidget(this._label);

    this._button = new QPushButton();
    this._button.setText(buttonText ?? 'Select file ...');
    this._button.addEventListener('clicked', () => {
      let selectedFileName: string;
      const fileDialog = new QFileDialog();

      fileDialog.setNameFilter('PDF documents (*.pdf)');
      fileDialog.setFileMode(FileMode.ExistingFile);

      if (fileDialog.exec()) {
        [selectedFileName] = fileDialog.selectedFiles();
        console.log(selectedFileName);
      }
    });
    this._widget.layout?.addWidget(this._button);
  }
}
