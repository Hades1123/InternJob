import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import ms from 'ms';

export function IsStringValue(property: string, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsStringValue',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          return ms(value) != undefined;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid time string (e.g., "1d", "2h", "30m")`;
        },
      },
    });
  };
}
