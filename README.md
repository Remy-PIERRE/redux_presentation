# Redux

## Présentation

Redux est une bibliothèque de gestion d'état pour des applications JavaScript, souvent utilisée avec React. Elle centralise les états de l'application dans un store unique et immuable, modifié uniquement par des actions et des reducers.

## Installation

<code>npm install redux react-redux</code>

## Création du store

**/src/store/store.js**

```js
// hook utilisé pour créer le store //
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
	// pour le moment aucun reducer à ajouter, nous le completerons plus tard //
	reducer: {},
});
```

## Création de d'une slice

Notre store pourra gérer et controller de nombreux états de l'application en même temps. Il convient donc de répartir ces états et reducers dans des "slices" bien séparées pour faciliter en faciliter la gestion.

**/src/store/features/counterslice.js**

```js
// hook utilisé pour créer la slice //
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
	// le nom est requis //
	name: "counter",

	// le state contenue dans la slice est composé de paires "cle-valeur" //
	initialState: {
		value: 5,
	},

	// ce sont les métodes qui permetteront d'agir sur nos états depuis les composants de l'application //
	reducers: {
		// chaque reducer reçoit automatiquement les arguments "state" = l'état actuel de notre slice //
		// et action qui contient les données que le composant à l'origine du déclenchement du reducer envoie //
		increment: (state, payload) => {
			state.value += 1;
		},
		decrement: (state) => {
			state.value -= 1;
		},
		incrementByAmount: (state, action) => {
			state.value += action.payload;
		},
	},
});

// on exporte les reducers en tant que "actions" //
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// c'est cet élément qui va être intégré au store créé un peu plus tôt //
export default counterSlice.reducer;
```

**/src/store/store.js**

```js
import { configureStore } from "@reduxjs/toolkit";
// on importe le reducer //
import countReducer from "./features/counterSlice.jsx";

export default configureStore({
	reducer: {
		// on intègre le reducer au store //
		counter: counterReducer,
	},
});
```

## Intégration du store dans l'application

Un store Redux est un composant d'ordre superieur : il ne possède pas de rendu contrairement aux autres composants.
Pour le rendre disponible dans le reste de l'application, il faut qu'il englobe les composants qui en auront besoin.
La manière la plus simple est donc d'englober le composant **App.jsx**, toute l'application aura accès au store de cette manière.

**main.js**

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// composant Redux qui permet l'intégration du store dans le JSX //
import { Provider } from "react-redux";
// le store lui même //
import store from "./store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
	// le storeenglobe le reste de l'application //
	<Provider store={store}>
		<App />
	</Provider>
);
```

## Utilisation du store depuis un composant

On peut maintenant utiliser notre store depuis un composant. On illustre Redux avec la création d'un compteur simple : un bouton pour incrémenter la valeur du 1 et un autre pour soustraire au total 1.

**App.jsx**

```js
import { useState } from "react";
import "./App.css";

// ces hooks permettent d'instancier le store dans le composant et d'utiliser ses actions définies dans la slice //
import { useSelector, useDispatch } from "react-redux";

// les actions à utiliser //
import { increment, decrement } from "./feature/counter/counter";

function App() {
    // on récupère le state de notre slice //
    // il agit comme un state, chacune de ses mutations entraine le refraichissement du composant //
    // ici je n'utilise que "value", mais je pourrais récupérer l'ensemble des states de la slice //
	const count = useSelector((state) => state.counter.value);

    // on instancie "useDispatch" pourpouvoir déclencher nos reducer si besoin //
	const dispatch = useDispatch();

    // @click //
	const handleIncreament = () => {
        // le reducer increment définie dans la slice est déclenché //
		dispatch(increment());
	};

    // @ click //
	const handleDecreament = () => {
        // le reducer decrement définie dans la slice est déclenché //
		dispatch(decrement());
	};

	return (
		<main>
            {* je peux utiliser mon state "count" directement dans le JSX *}
			<h1 style={{ marginBottom: "20px" }}>{count}</h1>

			<div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
				<button onClick={handleIncreament}>+1</button>
				<button onClick={handleDecreament}>-1</button>
			</div>
		</main>
	);
}

export default App;

```
