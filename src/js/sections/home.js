import config from 'config'
import utils from 'utils'
import classes from 'dom-classes'
import Default from './default'
import { on, off } from 'dom-event'
import framework from 'framework'
import Player from '@vimeo/player'

class Home extends Default {

	constructor(opt) {

		super(opt)

		this.slug = 'home'
		this.playing = false

		this.openIntro = this.openIntro.bind(this)
	}

	init(req, done) {

		super.init(req, done)
	}

	ready(done) {

		super.ready()
		this.loadVideo()
		done()
	}

	loadVideo() {

		this.player = new Player(this.ui.player, {
			id: 214714548,
			width: config.width,
			height: config.height,
			portrait: false,
			color: 'f9f9f9'
		})

		this.addEvents()
	}

	addEvents() {

		this.player.ready().then(() => {
			this.iframe = this.ui.player.querySelector('iframe')
			//on(this.ui.toggleVideo, 'click', this.onClickVideo.bind(this))
			//on(this.ui.toggleAudio, 'click', this.onClickAudio.bind(this))
			on(this.ui.clickIntro, 'click', this.openIntro)
			this.player.on('ended', this.nextScreen)
		}).catch(() => {})
	}

	removeEvents() {

		this.ui.player.removeChild(this.iframe)
		this.iframe = null
		this.player = null

		off(this.ui.clickIntro, 'click', this.openIntro.bind(this))
	}

	nextScreen() {
		framework.go('/choose')
	}

	openIntro() {
		const tl = new TimelineMax({
			paused: true,
			onComplete: () => {
				this.player.setVolume(1)
				this.player.play()
			}
		})

		this.playing = true

		tl.staggerFromTo(this.ui.animate, 0.7, { autoAlpha: 1 }, { autoAlpha: 0 }, -0.1)
		tl.to(this.ui.intro, 1.5, { autoAlpha: 1 })
		tl.set(this.ui.intro, { pointerEvents: 'auto' })
		tl.restart()
	}

	// onClickAudio() {
	// 	if (this.ui.video.muted ===  false) {
	// 		const tl = new TimelineMax({ paused: true })
	// 		tl.set(this.ui.mute, { display: 'block' })
	// 		tl.set(this.ui.sound, { display: 'none' })
	// 		tl.restart()
	// 		this.ui.video.muted = true;
	// 		console.log(this.ui.video.muted+"here")
	//
	// 	} else {
	// 		const tl = new TimelineMax({ paused: true })
	// 		tl.set(this.ui.sound, { display: 'block' })
	// 		tl.set(this.ui.mute, { display: 'none' })
	// 		tl.restart()
	// 		this.ui.video.muted = false;
	// 	}
	// }

	// onClickVideo() {
	// 	if (this.playing === true) {
	// 		this.ui.video.pause()
	// 		const tl = new TimelineMax({ paused: true })
	// 		tl.set(this.ui.play, { display: 'block' })
	// 		tl.set(this.ui.pause, { display: 'none' })
	// 		tl.restart()
	// 		this.playing = false
	//
	// 	} else {
	// 		this.ui.video.play()
	// 		const tl = new TimelineMax({ paused: true })
	// 		tl.set(this.ui.pause, { display: 'block' })
	// 		tl.set(this.ui.play, { display: 'none' })
	// 		tl.restart()
	// 		this.playing = true
	// 	}
	// }

	animateIn(req, done) {

		const tl = new TimelineMax({ paused: true, onComplete: done })

		classes.add(config.body, `is-${this.slug}`)

		tl.to(this.page, 1, { autoAlpha: 1 })
		tl.staggerFromTo(this.ui.animate, 3, {
			autoAlpha: 0,
			y: 10
		}, {
			autoAlpha: 1,
			y: 0
		}, 0.4)
		tl.restart()
	}

	animateOut(req, done) {

		const tl = new TimelineMax({ paused: true, onComplete: done })

		classes.remove(config.body, `is-${this.slug}`)

		if (this.playing === false) {
			tl.staggerFromTo(this.ui.animate, 0.7, { autoAlpha: 1 }, { autoAlpha: 0 }, -0.1)
		}

		tl.to(this.page, 0.7, { autoAlpha: 0 })
		tl.restart()
	}

	resize(width, height) {
		const attrs = { width: width, height: height }

		this.iframe && Object.assign(this.iframe, attrs)
	}

	destroy(req, done) {

		super.destroy()
		this.removeEvents()
		this.ui = null
		this.page.parentNode.removeChild(this.page)

		done()
	}
}

module.exports = Home
