import { FlexLayout, QWidget } from '@nodegui/nodegui';
import { FileWidget } from './FileWidget';

export class IOWidget extends QWidget {
  public inputFilePath: string | null = null;
  public outputFilePath: string | null = null;

  private _inputFileWidget = new FileWidget();
  private _outputFileWidget = new FileWidget();

  constructor() {
    super();
    this.setLayout(new FlexLayout());
    this.setObjectName('IOWidget');
    this.initialize();
  }

  private initialize() {
    this._inputFileWidget.setLabelText('Input file:');
    this._inputFileWidget.setBrowseButtonEventHandler(
      this.setInputFilePath.bind(this)
    );

    this._outputFileWidget.setLabelText('Output file:');
    this._outputFileWidget.setBrowseButtonEventHandler(
      this.setOutputFilePath.bind(this)
    );

    this.layout?.addWidget(this._inputFileWidget);
    this.layout?.addWidget(this._outputFileWidget);
  }

  private setInputFilePath(paths: string[] | false): void {
    if (!paths) {
      return;
    }

    this.inputFilePath = paths[0];
    this._inputFileWidget.setLabelText(`Input file: ${this.inputFilePath}`);
  }

  private setOutputFilePath(paths: string[] | false): void {
    if (!paths) {
      return;
    }

    this.outputFilePath = paths[0];
    this._inputFileWidget.setLabelText(`Output file: ${this.outputFilePath}`);
  }
}
