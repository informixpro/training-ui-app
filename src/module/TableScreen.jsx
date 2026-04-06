import React from 'react'
import { Container } from 'reactstrap'
import { useTranslation } from 'react-i18next'

import { Link } from 'react-router';
import { DataTableCard2, DateTime } from 'asab_webui_components'

import { getItems } from '../api/getItems.jsx'

function TableScreenHeader() {
	const { t } = useTranslation()
	return (
		<>
			<div className="flex-fill">
				<h3 className="d-flex align-items-center gap-2 mb-0">
					<i className="bi bi-people" aria-hidden />
					{t('General|Users')}
				</h3>
			</div>
		</>
	)
}

export function TableScreen(props) {
	const { t } = useTranslation()
	const { app } = props

	const columns = [
		{
			title: t('General|Username'),
			thStyle: {minWidth: "2rem"},
			render: ({ row }) =>
				<div>
					<p title={`Id: ${row.id}`}>{row.username}</p>
				</div>
		},
		{
			title: t('General|Email'),
			thStyle: {minWidth: "2rem"},
			render: ({row}) =>
					<p>{row.email}</p>
		},
		{
			title: t('General|Address'),
			thStyle: {minWidth: "2rem"},
			render: ({ row }) =>
					<p>{row.address}</p>
		},
		{
			title: t('General|Created at'),
			thStyle: {minWidth: "4rem"},
			render: ({ row }) => <DateTime value={row.created}/>
		},
		{
			title: t('General|Last sign-in'),
			thStyle: {minWidth: "4rem"},
			render: ({ row }) => <DateTime value={row.last_sign_in}/>
		},
		{
			title: t('General|Detail'),
			thStyle: {minWidth: "2rem"},
			render: ({ row }) =>
					<Link to={`/${row.id}`} className="btn btn-primary">
						{t('General|Detail')}
					</Link>
		},
	];

	return (
			<Container fluid>
				  <DataTableCard2
						app={app}
						columns={columns}
						loader={getItems}
						header={<TableScreenHeader />}
						rowHeight={20}
				/>
			</Container>
	)
}
