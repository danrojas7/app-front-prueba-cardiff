
export interface PersonValidationMessage {
  number: ValidationMessage[];
  firstName: ValidationMessage[];
  lastName: ValidationMessage[];
  documentNumber: ValidationMessage[];
  genre: ValidationMessage[];
  age: ValidationMessage[]
}

export interface ValidationMessage {
  type: string;
  message: string;
}
