import { Module } from "asab_webui_components"

import { ItemDetails } from '../components/ItemDetails.jsx'
import { TableScreen } from './TableScreen.jsx'

export default class TableApplicationModule extends Module {
	constructor(app, name) {
		super(app, "TableApplicationModule")

		app.Router.addRoute({
			path: "/",
			end: false,
			name: 'Users',
			component: TableScreen,
		})

		app.Router.addRoute({
			path: "/:id",
			name: 'ItemDetails',
			component: ItemDetails,
		})

		app.Navigation.addItem({
			name: "Users",
			icon: 'bi bi-people',
			url: "/",
		});
	}
}
