import config from 'config'
import utils from 'utils'
import classes from 'dom-classes'
import Default from './default'
import Draggable from '@lib/draggable'
import { on, off } from 'dom-event'
import ThrowPropsPlugin from '@lib/throw'

class Map extends Default {

	constructor(opt) {

		super(opt)

		this.slug = 'map'
		this.closeOverlay = this.closeOverlay.bind(this)
	}

	init(req, done) {

		super.init(req, done)
	}

	ready(done) {

		super.ready()
		this.addEvents()
		const bounding = this.ui.draggable.getBoundingClientRect()
		this.bounds = {
			x: bounding.width - config.width,
			y: bounding.height - config.height
		}

		this.map = this.initMap()[0]

		TweenLite.set(this.ui.draggable, { x: -800, y: -280 })

		done()
	}

		addEvents() {
			on(this.ui.clickOverlay, 'click', this.closeOverlay)
		}

		closeOverlay(evt){
			const tl = new TimelineMax({})
			tl.to(this.ui.holderOverlay, 1.5, { autoAlpha: 0 })
			tl.set(this.ui.holderOverlay, { display:none})
			alert("hello");
		}

	initMap() {
		return (
			Draggable.create(this.ui.draggable, {
				type: 'x, y',
				edgeResistance: 0.8,
				bounds: {
					minX: 0,
					minY: 0,
					maxX: -this.bounds.x,
					maxY: -this.bounds.y
				},
				throwProps: true
			})
		)
	}

	animateIn(req, done) {

		classes.add(config.body, `is-${this.slug}`)

		TweenLite.to(this.page, 1, {
			autoAlpha: 1,
			ease: Expo.easeInOut,
			onComplete: done
		})
	}

	animateOut(req, done) {

		classes.remove(config.body, `is-${this.slug}`)

		TweenLite.to(this.page, 0.7, {
			autoAlpha: 0,
			ease: Expo.easeInOut,
			clearProps: 'all',
			onComplete: done
		})
	}

	resize(width, height) {

		const bounding = this.ui.draggable.getBoundingClientRect()
		this.bounds = {
			x: bounding.width - config.width,
			y: bounding.height - config.height,
		}

		this.map.applyBounds({
			minX: 0,
			minY: 0,
			maxX: -this.bounds.x,
			maxY: -this.bounds.y
		})
	}

	destroy(req, done) {

		super.destroy()

		this.map.kill()

		this.page.parentNode.removeChild(this.page)

		done()
	}
}

module.exports = Map
