import { PhoneNumberUtil } from 'google-libphonenumber';

const validatePhone = (country, number) => {
  if (!country) return { err: false };
  if (number.length >= 18)
    return { err: true, msg: 'The input is not valid phone number!' };

  const phoneUtil = PhoneNumberUtil.getInstance();
  const parsedNumber = phoneUtil.parseAndKeepRawInput(number, country);

  if (phoneUtil.isPossibleNumber(parsedNumber)) return { err: false };
  return { err: true, msg: 'The input is not valid phone number!' };
};

export default validatePhone;
