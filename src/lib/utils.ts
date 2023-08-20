import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { addDays, subDays, formatDistance } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateEstimateEndDate = (startDateValue: string, durationValue: string) => {
  // Convert the start date string to a JavaScript Date object.
  const startDate = new Date(startDateValue);

  // Split the duration string into a list of words.
  const durationWords = durationValue.split(' ');

  // Get the number of days from the duration string.
  const durationNumber = Number(durationWords[0]);

  const durationDate = addDays(startDate, durationNumber);

  const today = new Date();

  const elapsedDays = formatDistance(today, durationDate);

  // Format the result and return it.
  return elapsedDays;
};
