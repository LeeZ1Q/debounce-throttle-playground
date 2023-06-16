import './App.css';
import Counter from './components/Counter';
import Input from './components/Input';
import List from './components/List';

function App() {
	return (
		<div className='App'>
			<Counter />
			<hr />
      <Input />
      <hr />
      <List />
		</div>
	);
}

export default App;
