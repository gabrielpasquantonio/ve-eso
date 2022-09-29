export const ManipulationHelper = (value: number | undefined): string => {
  const date = new Date(value!);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};
