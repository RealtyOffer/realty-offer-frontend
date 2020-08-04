import { addHours, addMinutes, differenceInMinutes, isPast, parseISO } from 'date-fns';

const timezoneOffsetInMinutes = (createDateTime: Date) =>
  // multiply by negative 1 so we can always do addMinutes() in localizedDateTime, where we can add
  // negative OR positive minutes, so that the offset is taken in the right direction based on UTC
  new Date(createDateTime).getTimezoneOffset() * -1;

export const localizedCreateDateTime = (createDateTime: Date) =>
  new Date(addMinutes(parseISO(String(createDateTime)), timezoneOffsetInMinutes(createDateTime)));

// difference in minutes from expiration date to now, divided by 1440 which is number of minutes
// in a day (24*60). Then multiply that by 100 to get percentage value
export const timeDifference = (createDateTime: Date) => {
  return (differenceInMinutes(Date.now(), localizedCreateDateTime(createDateTime)) / 1440) * 100;
};

// 2 hours out of 24
export const isExpiringSoon = (createDateTime: Date) => {
  return timeDifference(localizedCreateDateTime(createDateTime)) < 8.3333333;
};

export const expiresAt = (createDateTime: Date) =>
  addHours(localizedCreateDateTime(createDateTime), 24);

export const isExpired = (createDateTime: Date) => isPast(expiresAt(createDateTime));

export const timeNowWithOffset = (createDateTime: Date) =>
  // return milliseconds for use in react-countdown's now prop
  new Date(addMinutes(new Date(), timezoneOffsetInMinutes(createDateTime))).getTime();
