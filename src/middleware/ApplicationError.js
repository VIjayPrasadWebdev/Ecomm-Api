export class ApplicationError extends Error {
  constructor(errormsg, status) {
    super(errormsg);
    this.status = status;
  }
}
