import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ async: false })
export class IsStrongSecretConstraint implements ValidatorConstraintInterface {
  validate(secret: string) {
    // Check if the secret length is exactly 64 bytes (128 hex characters)
    return typeof secret === "string" && secret.length === 128;
  }

  defaultMessage() {
    return "Secret must be a 64-byte (512 bits) hexadecimal string.";
  }
}

export function IsStrongSecret(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "isStrongSecret",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsStrongSecretConstraint,
    });
  };
}
