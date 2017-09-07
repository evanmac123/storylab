import config from 'config'
import utils from 'utils'
import classes from 'dom-classes'
import Default from './default'

class Choose extends Default {

	constructor(opt) {

		super(opt)

		this.slug = 'choose'
	}

	init(req, done) {

		super.init(req, done)
	}

	ready(done) {

		super.ready()

		done()
	}

	animateIn(req, done) {

		classes.add(config.body, `is-${this.slug}`)

		const tl = new TimelineMax({ paused: true, onComplete: done })

		tl.set([this.ui.content, this.ui.card], {
			y: 10,
			autoAlpha: 0
		})
		tl.set(this.page, { scale: 1.1 })

		tl.to(this.page, 2, { scale: 1, autoAlpha: 1 })
		tl.staggerTo([...this.ui.content, ...this.ui.card], 1.2, { y: 0, autoAlpha: 1, clearProps: 'y' }, 0.15, '-=1.5')
		tl.restart()
	}

	animateOut(req, done) {

		classes.remove(config.body, `is-${this.slug}`)

		const tl = new TimelineMax({ paused: true, onComplete: done })

		tl.staggerTo([this.ui.card, this.ui.content], 1, { autoAlpha: 0 }, 0.2)
		tl.to(this.page, 1, { autoAlpha: 0 })
		tl.restart()
	}

	destroy(req, done) {

		super.destroy()

		this.page.parentNode.removeChild(this.page)

		done()
	}
}

module.exports = Choose
