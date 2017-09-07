import config from 'config'

module.exports = {
	[`${config.BASE}`]: require('./sections/home'),
	[`${config.BASE}about`]: { section: require('./sections/page') },
	[`${config.BASE}join`]: { section: require('./sections/join') },
	[`${config.BASE}choose`]: { section: require('./sections/choose') },
	[`${config.BASE}persona/:id`]: { section: require('./sections/persona'), duplicate: true },
	[`${config.BASE}persona/:id/map`]: { section: require('./sections/map'), duplicate: true },
	[`${config.BASE}persona/:id/map/:location`]: { section: require('./sections/location'), duplicate: true },
	[`${config.BASE}persona/:id/map/:location/hotspot/:hotspot`]: { section: require('./sections/hotspot'), duplicate: true }
}
