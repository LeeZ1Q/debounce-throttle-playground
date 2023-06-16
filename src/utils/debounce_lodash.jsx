const debounce = (fn, wait, options) => {
	// option: {leading: boolean, trailling: boolean, maxWait: number}
	let lastCallTime,
		lastInvokeTime,
		timerId,
		maxWait,
		maxing,
		leading,
		trailing,
		result,
		allArgs;

	lastInvokeTime = 0;
	leading = false;
	trailing = true;
	maxing = false;

	if (options) {
		leading = 'leading' in options ? !!options.leading : leading;
		trailing = 'trailing' in options ? !!options.trailing : trailing;
		maxing = 'maxWait' in options;
		maxWait = options.maxWait;
	}

	function debounced(...args) {
		const time = Date.now();
		const canInvoke = shouldInvoke(time);
		allArgs = args;
		lastCallTime = time;

		if (canInvoke) {
			if (timerId === undefined) {
				return leadingEdge(time);
			}
		}

		return result;
	}

	function shouldInvoke(time) {
		const timeSinceLastCall = time - lastCallTime;
		const timeSinceLastInvoke = time - lastInvokeTime;
		// 三种情况下可以调用
		// 1. 第一次调用
		// 2. 距离上次调用已经超过wait
		// 3. 距离上次调用已经超过maxWait
		return (
			lastCallTime === undefined ||
			timeSinceLastCall >= wait ||
			(maxing && timeSinceLastInvoke >= maxWait)
		);
	}

	function leadingEdge(time) {
		lastInvokeTime = time;
		timerId = setTimeout(timerExpired, wait);
		return leading ? invokeFunc(time) : result;
	}

	function timerExpired() {
		const time = Date.now();
		if (shouldInvoke(time)) {
			return trailingEdge(time);
		}
		// 继续等待
		timerId = setTimeout(timerExpired, remainingWait(time));
	}

	function remainingWait(time) {
		const timeSinceLastCall = time - lastCallTime;
		const timeSinceLastInvoke = time - lastInvokeTime;
		const timeWaiting = wait - timeSinceLastCall;
		return maxing
			? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
			: timeWaiting;
	}

	function trailingEdge(time) {
		// 运行trailing说明一次调用的结束
		timerId = undefined;

		if (trailing && allArgs) {
			return invokeFunc(time);
		}
		lastInvokeTime = time;
		return result;
	}

	function invokeFunc(time) {
		lastInvokeTime = time;
		const copyArgs = allArgs;
		allArgs = undefined;
		if (copyArgs) {
			return fn(...copyArgs);
		}
		return fn();
	}

	return debounced;
};

export default debounce;
