import domselect from 'dom-select'
import query from 'query-dom-components'

const config = {

	BASE: '/',

	body: document.body,
	view: domselect('main'),

	width: window.innerWidth,
	height: window.innerHeight,

	ui: query({ el: document.body })
}

export default config
