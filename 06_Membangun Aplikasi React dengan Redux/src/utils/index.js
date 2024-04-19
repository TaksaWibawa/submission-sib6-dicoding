import { formatDistanceToNow } from 'date-fns';

export const utils = {
  removeHTMLTags: (str) => str.replace(/<[^>]*>?/gm, ' '),
  capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),
  getUniqueValues: (data, property) => {
    if (!data) return [];

    const uniqueValues = data?.reduce((acc, item) => {
      const value = item[property];
      acc[value] = acc[value] ? acc[value] + 1 : 1;
      return acc;
    }, {});

    const uniqueValuesArray = Object.entries(uniqueValues)
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => b.count - a.count);

    return uniqueValuesArray;
  },
  calculateTimeDistance: (date) => formatDistanceToNow(new Date(date), { addSuffix: true }),
};
