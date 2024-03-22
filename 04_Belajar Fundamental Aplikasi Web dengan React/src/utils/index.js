const showFormattedDate = (date) => {
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};
	return new Date(date).toLocaleDateString('id-ID', options);
};

const filterByKeyword = (items, keyword) => {
	return items.filter((item) => item.title.toLowerCase().includes(keyword.toLowerCase()));
};

export { showFormattedDate, filterByKeyword };
