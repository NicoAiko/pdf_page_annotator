import {
  FileMode,
  FlexLayout,
  QFileDialog,
  QLabel,
  QMainWindow,
  QPushButton,
  QWidget,
} from '@nodegui/nodegui';

export class PDFPageAnnotator {
  public static window: QMainWindow;
  public static widget: QWidget;

  public static async main(): Promise<void> {
    this.window = new QMainWindow();
    this.window.setWindowTitle('PDF Page Annotator');

    this.initializeWidget();
    this.window.setCentralWidget(this.widget);

    this.initializeInputField();

    this.window.show();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).win = this.window;
  }

  private static initializeWidget(): void {
    this.widget = new QWidget();
    this.widget.setLayout(new FlexLayout());
  }

  private static initializeInputField() {
    const label = new QLabel();
    label.setText('Input file:');
    this.widget.layout?.addWidget(label);

    const inputFileButton = new QPushButton();
    inputFileButton.setText('Select file...');
    inputFileButton.addEventListener('clicked', () => {
      let selectedFileName: string;
      const inputFileDialog = new QFileDialog();
      inputFileDialog.setNameFilter('PDF documents (*.pdf)');
      inputFileDialog.setFileMode(FileMode.ExistingFile);

      if (inputFileDialog.exec()) {
        [selectedFileName] = inputFileDialog.selectedFiles();
        console.log(selectedFileName);
      }
    });
    this.widget.layout?.addWidget(inputFileButton);
  }
}

PDFPageAnnotator.main();
