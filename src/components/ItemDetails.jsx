import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { Card, CardBody, CardHeader, CardTitle, CardSubtitle, Container } from 'reactstrap'
import { useTranslation } from 'react-i18next'

import { DateTime } from 'asab_webui_components'

import { getItemById } from '../api/getItems.jsx'

export function ItemDetails() {
	const { id } = useParams()
	const { t } = useTranslation()
	const [item, setItem] = useState(null)
	const [loading, setLoading] = useState(true)


	useEffect(() => {
		let cancelled = false
		setLoading(true)
		getItemById(id).then((row) => {
			if (!cancelled) {
				setItem(row)
				setLoading(false)
			}
		})
	
		return () => {
			cancelled = true
		}
	}, [id])

	if (loading) {
		return (
			<Container fluid className="py-3">
				<p className="text-muted mb-0">{t('General|Loading')}</p>
			</Container>
		)
	}


	return (
		<Container fluid className="py-3">
			<div className="mb-3">
				<Link to="/" className="btn btn-link d-inline-flex align-items-center gap-2 p-0">
					<i className="bi bi-arrow-left" aria-hidden />
					{t('General|Back to list')}
				</Link>
			</div>
			{!item ? (
				<div className="alert alert-danger" role="alert">
					{t('General|Item not found')}
				</div>
			) : (
				<Card>
					<CardHeader>
						<h2 className="h5 mb-0 d-flex align-items-center gap-2">
							<i className="bi bi-person" aria-hidden />
							<span title={`Id: ${item.id}`}>{item.username}</span>
						</h2>
					</CardHeader>
					<CardBody>
						<dl className="row mb-0">
							<dt className="col-sm-3">{t('General|Email')}</dt>
							<dd className="col-sm-9">{item.email}</dd>
							<dt className="col-sm-3">{t('General|Address')}</dt>
							<dd className="col-sm-9">{item.address}</dd>
							<dt className="col-sm-3">{t('General|Created at')}</dt>
							<dd className="col-sm-9"><DateTime value={item.created} /></dd>
							<dt className="col-sm-3">{t('General|Last sign-in')}</dt>
							<dd className="col-sm-9"><DateTime value={item.last_sign_in} /></dd>
						</dl>
					</CardBody>
				</Card>
			)}
		</Container>
	)
}
