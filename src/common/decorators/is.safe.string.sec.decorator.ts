import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

export function IsSafeString(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "isSafeString",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== "string") return false; // Ensure value is a string

          // Updated pattern to allow more special characters
          const safePattern =
            /^[a-zA-Z0-9\s_\-\.\@\#\$\%\^\&\*\(\)\+\=\!\?\/\:]+$/;
          return safePattern.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} contains unsafe characters`;
        },
      },
    });
  };
}
