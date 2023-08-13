import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

  // Calculate the end date by adding the duration to the start date.
  const endDate = new Date(startDate.getTime() + durationNumber * 24 * 60 * 60 * 1000);

  // Get the number of days and hours between the start date and the end date.
  const days = (endDate.valueOf() - startDate.valueOf()) / (24 * 60 * 60 * 1000);
  // const hours = ((endDate.valueOf() - startDate.valueOf()) / (60 * 60 * 1000)) % 24;

  // Format the result and return it.
  return `${days} days`;
};
