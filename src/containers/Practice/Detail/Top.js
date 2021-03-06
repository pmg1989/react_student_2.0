import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import styles from './Top.less'

const Top = ({ info }) => {
  return (
    <div className={styles.top_box}>
      <div className={styles.top}>
        <div className={styles.thumbs}>
          <img src={info.get('cover')} alt={info.get('title')} />
          <span className={styles.index}>{info.get('index')}</span>
        </div>
        <div className={styles.text}>
          <span className={styles.title}>{info.get('name')}</span><br />
          <span>{info.get('title')}</span><br />
          <span>{info.get('stage')}</span>
        </div>
      </div>
      <div className={styles.des}>
        <span>{info.get('description')}</span>
      </div>
    </div>
  )
}

Top.propTypes = {
  info: PropTypes.instanceOf(Immutable.Map).isRequired,
}

export default Top
