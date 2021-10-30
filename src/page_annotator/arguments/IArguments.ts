export interface Arguments {
  [x: string]: unknown;

  /**
   * input file path
   */
  i: string;

  /**
   * output file path
   */
  o: string;

  /**
   * render text format
   * @default "Page %s"
   */
  f: string;

  /**
   * leading zeros
   * @default 2
   */
  z: number;

  /**
   * start page number of marking
   */
  s?: number;

  /**
   * end page number of marking
   */
  e?: number;

  /**
   * other
   */
  _: (string | number)[];
}
