/* eslint-disable no-underscore-dangle */
export default class Box {
  constructor(ri, ci) {
    this._rowIndex = ri;
    this._colIndex = ci;
    this._status = 'none';
  }

  get status() {
    return this._status;
  }

  get rowIndex() {
    return this._rowIndex;
  }

  get colIndex() {
    return this._colIndex;
  }

  set status(status) {
    this._status = status;
  }

  set rowIndex(value) {
    this._rowIndex = value;
  }

  set colIndex(value) {
    this._colIndex = value;
  }

  setStatus(status) {
    this._status = status;
    return this;
  }

  setRowIndex(value) {
    this._rowIndex = value;
    return this;
  }

  setColIndex(value) {
    this._colIndex = value;
    return this;
  }

  setCoords(row, col) {
    this._rowIndex = row;
    this._colIndex = col;
    return this;
  }
}
