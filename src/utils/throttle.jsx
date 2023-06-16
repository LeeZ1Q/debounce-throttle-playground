const throttle = (fn, delay) => {
	let last = 0;
	return (...args) => {
		const now = Date.now();
		if (now - last < delay) {
			return;
		}
		last = now;
		return fn(...args);
	};
};

export default throttle;
