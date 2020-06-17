import { PhoneNumberUtil } from 'google-libphonenumber';

const validatePhone = (country, number) => {
  if (!country || !number) return { err: false };
  if (number.length >= 18 || !Number(number))
    return { err: true, msg: 'Please enter a valid mobile phone number' };

  const phoneUtil = PhoneNumberUtil.getInstance();
  const parsedNumber = phoneUtil.parseAndKeepRawInput(number, country);

  if (phoneUtil.isPossibleNumber(parsedNumber)) return { err: false };
  return { err: true, msg: 'Please enter a valid mobile phone number' };
};

export default validatePhone;
