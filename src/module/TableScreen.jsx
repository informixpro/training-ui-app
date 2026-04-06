import React from 'react'
import { Container } from 'reactstrap'
import { useTranslation } from 'react-i18next'

import { Link } from 'react-router';
import { DataTableCard2, DateTime } from 'asab_webui_components'

import { getItems } from '../api/getItems.jsx'

export function TableScreen(props) {
	const { t } = useTranslation()

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
	]

	return (
			<Container  className='h-100'>
				  <DataTableCard2
						app={app}
						columns={columns}
						loader={getItems}
						rowHeight={20}
				/>
			</Container>
	)
}
