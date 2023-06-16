import React from 'react';
// import debounce from '../utils/debounce';
import debounce from '../utils/debounce_lodash';

const Counter = () => {
	const [debounceCount, setDebounceCount] = React.useState(0);
	const [normalCount, setNormalCount] = React.useState(0);

	const handleDebounce = React.useMemo(() => {
		return debounce(
			() => {
				setDebounceCount((prev) => prev + 1);
			},
			500,
			{ leading: true, trailing: false, maxWait: 500 }
		);
	}, []);

	return (
		<div className='counter-group'>
			<div className='counter'>
				<button onClick={() => setNormalCount((prev) => prev + 1)}>
					normalCount
				</button>
				<h1>{normalCount}</h1>
			</div>
			<div className='counter'>
				<button onClick={handleDebounce}>Debounce Click (500ms)</button>
				<h1>{debounceCount}</h1>
			</div>
		</div>
	);
};

export default Counter;
