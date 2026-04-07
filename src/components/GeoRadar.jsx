import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
	Button,
	Card,
	CardBody,
	CardTitle,
	Container,
	Form,
	Input,
	InputGroup,
	ListGroup,
	ListGroupItem,
	Spinner,
} from 'reactstrap'

import { getCityImageUrl } from '../api/getCityImage.jsx'
import { geocodeCity } from '../api/getGeocode.jsx'

const FIELD_KEYS = ['latitude', 'longitude', 'elevation', 'timezone', 'population']

export function GeoRadar() {
	const { t } = useTranslation()
	const [query, setQuery] = useState('Prague')
	const [loading, setLoading] = useState(false)
	const [place, setPlace] = useState(null)
	const [cityImageUrl, setCityImageUrl] = useState(null)
	const [error, setError] = useState(null)

	const onSearch = useCallback(
		async (e) => {
			e.preventDefault()
			const trimmed = query.trim()
			if (!trimmed) {
				setError(t('GeoRadar|Enter a city name'))
				setPlace(null)
				setCityImageUrl(null)
				return
			}
			setLoading(true)
			setError(null)
			setCityImageUrl(null)
			const result = await geocodeCity(trimmed)
			if (!result) {
				setLoading(false)
				setError(t('GeoRadar|No location found'))
				setPlace(null)
				return
			}
			setPlace(result)
			const imageUrl = await getCityImageUrl(result.name)
			setCityImageUrl(imageUrl)
			setLoading(false)
		},
		[query, t]
	)

	return (
		<Container fluid className="py-3">
			<h1 className="mb-3">{t('GeoRadar|Title')}</h1>

			<Form onSubmit={onSearch} className="mb-4">
				<InputGroup className="flex-wrap gap-2">
					<Input
						type="search"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder={t('GeoRadar|City name')}
						aria-label={t('GeoRadar|City name')}
						className="flex-grow-1"
						style={{ minWidth: '12rem' }}
					/>
					<Button type="submit" color="primary" disabled={loading}>
						{loading ? <Spinner size="sm" /> : t('General|Search')}
					</Button>
				</InputGroup>
			</Form>

			{error && <p className="text-danger mb-3">{error}</p>}

			{place && (
				<Card className="shadow-sm overflow-hidden" style={{ maxWidth: '28rem' }}>
					{cityImageUrl && (
						<img
							src={cityImageUrl}
							alt=""
							className="card-img-top w-100"
							style={{ maxHeight: '200px', objectFit: 'cover' }}
							onError={() => setCityImageUrl(null)}
						/>
					)}
					<CardBody>
						<div className="d-flex justify-content-between align-items-baseline gap-2">
							<CardTitle tag="h2" className="h5 mb-0 flex-grow-1">
								{place.name}
							</CardTitle>
							{place.country_code != null && place.country_code !== '' && (
								<span className="text-muted small text-nowrap" title={t('GeoRadar|Country code')}>
									{place.country_code}
								</span>
							)}
						</div>
					</CardBody>
					<ListGroup flush>
						{FIELD_KEYS.map((key) => (
							<ListGroupItem
								key={key}
								className="d-flex justify-content-between align-items-center small px-3 py-2"
							>
								<span className="text-muted">{t(`GeoRadar|${key}`)}</span>
								<span className="text-break ps-2">{place[key] ?? '—'}</span>
							</ListGroupItem>
						))}
					</ListGroup>
				</Card>
			)}
		</Container>
	)
}
