import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./store/features/counter";

function App() {
	const count = useSelector((state) => state.counter.value);
	const dispatch = useDispatch();

	const handleIncreament = () => {
		dispatch(increment());
	};

	const handleDecreament = () => {
		dispatch(decrement());
	};

	return (
		<main>
			<h1 style={{ marginBottom: "20px" }}>{count}</h1>
			<div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
				<button onClick={handleIncreament}>+1</button>
				<button onClick={handleDecreament}>-1</button>
			</div>
		</main>
	);
}

export default App;
