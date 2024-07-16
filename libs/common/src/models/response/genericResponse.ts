export class GenericResponse {
  appStatusCode: string;

  constructor(appStatusCode: string) {
    this.appStatusCode = appStatusCode;
  }

  static success(appStatusCode: string): GenericResponse {
    return new this(appStatusCode);
  }

  static error(appStatusCode: string): GenericResponse {
    return new this(appStatusCode);
  }
}
