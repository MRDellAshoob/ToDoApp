import { format, isToday } from "date-fns";

export const formatTimeRange = (startDate: string, endDate: string): string => {
  try {
    const start = format(new Date(startDate), "hh:mm a"); // Format start date
    const end = format(new Date(endDate), "hh:mm a"); // Format end date
    return `${start} - ${end}`;
  } catch (error) {
    console.error("Error formatting time range:", error);
    return "Invalid date range";
  }
};


export const isStartDateToday = (date: string): boolean => {
  const parsedDate = new Date(date);
  return isToday(parsedDate); // Checks if the date is today
};