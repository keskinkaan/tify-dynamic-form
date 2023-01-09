const isObject = <T>(data: unknown): data is T => {
	if (data !== null && typeof data === 'object') {
		return true;
	} else {
		return false;
	}
};

const convertDate = (date: string) => {
	const d = date.split('-');
	const newDate = `${d[2]}/${d[1]}/${d[0]}`;
	return newDate;
};

const formatDate = (date: Date) =>
	`${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
		date.getFullYear(),
	)} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(
		date.getSeconds(),
	).padStart(2, '0')}.${String(date.getMilliseconds()).padStart(3, '0')}`;

export { isObject, convertDate, formatDate };
