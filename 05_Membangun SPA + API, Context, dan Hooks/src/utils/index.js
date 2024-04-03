const showFormattedDate = (date, lang) => {
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};
	return new Date(date).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-GB', options);
};

const filterByKeyword = (items, keyword) => {
	return items.filter((item) => item.title.toLowerCase().includes(keyword.toLowerCase()));
};

const capitalizeSentence = (sentence) => {
	return sentence
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
};

export { showFormattedDate, filterByKeyword, capitalizeSentence };
