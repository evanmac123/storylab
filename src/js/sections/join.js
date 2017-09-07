import config from 'config'
import utils from 'utils'
import classes from 'dom-classes'
import { on, off } from 'dom-event'
import Default from './default'
import App from './../app.js'

class Join extends Default {

	constructor(opt) {

		super(opt)

		this.slug = 'join'
    this.nextScreen = this.nextScreen.bind(this)
	}

	init(req, done) {

		super.init(req, done)
	}

	ready(done) {

		super.ready()
    this.addEvents()
		done()
	}

  addEvents() {
		this.ui.progress.forEach(click => on(click, 'click', this.nextScreen))
		}

	removeEvents() {
		this.ui.progress.forEach(click => off(click, 'click', this.nextScreen))
	  }

    nextScreen(evt){

  		this.target = evt.currentTarget.id
      if(this.target === '1'){
        const tl = new TimelineMax({ paused: true })
    		tl.to(this.ui.intro,  .4, { opacity: 0 })
        tl.set(this.ui.intro, { display: 'none' })
        tl.set(this.ui.photo, { display: 'block' })
    		tl.to(this.ui.photo,  .4, { opacity: 1 })
    		tl.restart()
      }
      if(this.target === '2'){
        const tl = new TimelineMax({ paused: true })
    		tl.to(this.ui.photo,  .4, { opacity: 0 })
        tl.set(this.ui.photo, { display: 'none' })
        tl.set(this.ui.post, { display: 'block' })
    		tl.to(this.ui.post,  .4, { opacity: 1 })
    		tl.restart()
      }

      if(this.target === '3'){
        const tl = new TimelineMax({ paused: true })
        tl.to(this.ui.post,  .4, { opacity: 0 })
        tl.set(this.ui.post, { display: 'none' })
        tl.set(this.ui.share, { display: 'block' })
        tl.to(this.ui.share,  .4, { opacity: 1 })
        tl.restart()
      }

      if(this.target === '4'){
        config.ui.menu.click()
        tl.set(this.ui.intro, { display: 'block' })
        tl.to(this.ui.intro,  .4, { opacity: 1 })
    		tl.to(this.ui.share,  .4, { opacity: 0 })
        tl.set(this.ui.share, { display: 'none' })
      }
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
			onComplete: done
		})
	}

	destroy(req, done) {

		super.destroy()
    this.removeEvents()

		this.page.parentNode.removeChild(this.page)

		done()
	}
}

module.exports = Join
