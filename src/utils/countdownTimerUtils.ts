import { addHours, differenceInMinutes } from 'date-fns';

// difference in minutes from expiration date to now, divided by 1440 which is number of minutes
// in a day (24*60). Then multiply that by 100 to get percentage value
export const timeDifference = (createDateTime: Date) => {
  return (differenceInMinutes(new Date(createDateTime), Date.now()) / 1440) * 100;
};

// 2 hours out of 24
export const isExpiringSoon = (createDateTime: Date) => {
  return timeDifference(createDateTime) < 8.3333333;
};

export const expiresAt = (createDateTime: Date) => addHours(new Date(createDateTime), 24);

const timezoneOffsetInMinutes = (createDateTime: Date) =>
  new Date(createDateTime).getTimezoneOffset();

export const timeNowWithOffset = (createDateTime: Date) =>
  Date.now() + timezoneOffsetInMinutes(createDateTime) * 60000;
