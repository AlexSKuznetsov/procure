import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { addDays, addHours, differenceInMinutes, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateEstimateEndDate = (startDateValue: string, durationValue: string) => {
  // Convert the start date string to a JavaScript Date object.
  const startDate = parseISO(startDateValue);
  const currentDate = new Date();

  const endDate = getEndDate(startDate, durationValue);

  const elapsedMinutes = differenceInMinutes(endDate, currentDate);

  const days = Math.floor(elapsedMinutes / (24 * 60));
  const hours = Math.floor((elapsedMinutes % (24 * 60)) / 60);
  const minutes = elapsedMinutes % 60;

  return `${days} days ${hours} hours ${minutes} minutes`;
};

const getEndDate = (startDate: Date, duration: string) => {
  const durationWords = duration.split(' ');
  if (durationWords[1].includes('day')) {
    return addDays(startDate, parseInt(durationWords[0]));
  } else {
    return addHours(startDate, parseInt(durationWords[0]));
  }
};
