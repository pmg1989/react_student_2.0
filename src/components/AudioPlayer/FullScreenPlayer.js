import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Slider } from 'antd-mobile'
import { Icon } from 'components'
import { parseTime } from 'utils/tools'
import styles from './FullScreenPlayer.less'

class FullScreenPlayer extends Component {
  static propTypes = {
    current: PropTypes.shape({
      title: PropTypes.string,
      author: PropTypes.string,
      thumb: PropTypes.string,
      source: PropTypes.string,
    }).isRequired,
    loop: PropTypes.bool.isRequired,
    playing: PropTypes.bool.isRequired,
    switching: PropTypes.bool.isRequired,
    isFullScreen: PropTypes.bool.isRequired,
    hideFullScreen: PropTypes.func.isRequired,
    handleLoop: PropTypes.func.isRequired,
    handlePlayPause: PropTypes.func.isRequired,
    handlePrev: PropTypes.func.isRequired,
    handleNext: PropTypes.func.isRequired,
    handleSwitch: PropTypes.func.isRequired,
    setAudioElement: PropTypes.func.isRequired,
  }

  state = {
    isSliding: false,
    currentTime: 0,
    totalTime: 0,
    percent: 0,
  }

  componentDidMount () {
    const { $audio } = this

    $audio.addEventListener('canplay', (e) => {
      !this.props.playing && $audio.pause()
      this.setState({ totalTime: e.target.duration })
    })

    $audio.addEventListener('loadstart', () => {
      setTimeout(() => { this.props.switching && this.props.handlePlayPause() }, 250)
    })

    $audio.addEventListener('ended', () => {
      if (this.props.loop) {
        this.props.handleSwitch()
        setTimeout(() => { this.props.handlePlayPause() }, 0)
      } else {
        this.props.handleNext()
      }
    })

    $audio.addEventListener('timeupdate', (e) => {
      const { currentTime, duration } = e.target
      if (!this.state.isSliding && !isNaN(duration)) {
        this.setState({ currentTime, percent: (currentTime / duration) * 100 })
      }
    })
  }

  render () {
    const {
      current, playing, loop, isFullScreen,
      setAudioElement, hideFullScreen, handleLoop, handlePlayPause, handlePrev, handleNext } = this.props

    const { currentTime, totalTime, percent } = this.state

    const slideProps = {
      step: 0.1,
      value: percent,
      onChange: (per) => {
        this.setState({ percent: per, isSliding: true, currentTime: (percent * totalTime) / 100 })
      },
      onAfterChange: (per) => {
        this.setState({ isSliding: false })
        this.$audio.currentTime = this.$audio.duration * (per / 100)
      },
      trackStyle: {
        backgroundColor: '#00CD23',
        height: '3px',
      },
      railStyle: {
        backgroundColor: '#cfcbd0',
        height: '3px',
      },
      handleStyle: {
        borderColor: '#00CD23',
        height: '16px',
        width: '16px',
        marginLeft: '-7px',
        marginTop: '-7px',
        backgroundColor: '#00CD23',
        boxShadow: '0 0 1px 1px #00CD23',
      },
    }

    const audioProps = {
      autoPlay: 'autoplay',
      src: current.source,
      ref: (c) => {
        this.$audio = c
        setAudioElement(c)
      },
    }

    return (
      <div className={classnames(styles.full_screen_box, isFullScreen && styles.active)}>
        <div className={styles.back} onClick={hideFullScreen}>
          <Icon type={require('svg/arrow-down.svg')} />
        </div>
        <div className={styles.info}>
          <span className={styles.title}>{current.title}</span><br />
          <span className={styles.author}>{current.author}</span>
        </div>
        <div className={styles.image_bg}>
          <img src={current.thumb} alt="thumb" />
        </div>
        <div className={styles.slider_box}>
          <span className={styles.curtime}>{parseTime(currentTime)}</span>
          <Slider {...slideProps} />
          <span className={styles.duration}>{parseTime(totalTime)}</span>
        </div>
        <div className={styles.opt_box}>
          {loop ?
            <Icon onClick={handleLoop} type={require('svg/loop.svg')} /> :
            <Icon onClick={handleLoop} type={require('svg/loop-no.svg')} />
          }
          <Icon type={require('svg/prev.svg')} onClick={handlePrev} />
          {playing ?
            <Icon className={styles.pause_o} onClick={handlePlayPause} type={require('svg/pause-o.svg')} /> :
            <Icon className={styles.play_o} onClick={handlePlayPause} type={require('svg/play-o.svg')} />
          }
          <Icon type={require('svg/next.svg')} onClick={handleNext} />
          <Icon type={require('svg/share.svg')} />
        </div>
        <audio {...audioProps}>audio not supported :(</audio>
      </div>
    )
  }
}

export default FullScreenPlayer
