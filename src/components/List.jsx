import React from 'react';
import throttle from '../utils/throttle_lodash';

const getList = () => {
	const arr = [];
	for (let i = 0; i < 20; i++) {
		arr.push(`Hello World`);
	}
	return arr;
};

const list = getList();

const List = () => {
	const [data, setData] = React.useState(list);

	React.useEffect(() => {
		window.addEventListener(
			'scroll',
			throttle(() => {
				if (
					window.innerHeight + window.scrollY >=
					document.body.offsetHeight - 600
				) {
					setData((prev) => {
						const copy = [...prev];
						for (let i = 0; i <= 20; i++) {
							copy.push(`Hello World`);
						}
						return copy;
					});
				}
			}, 50)
		);
	}, []);
	return (
		<div>
			{data.map((item, index) => (
				<h2 key={index}>{item}</h2>
			))}
			<hr />
		</div>
	);
};

export default List;
