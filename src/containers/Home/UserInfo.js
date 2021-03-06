import React from 'react'
import PropTypes from 'prop-types'
import { renderBgImage } from 'utils/tools'
import styles from './UserInfo.less'

const UserInfo = ({ avatar, firstName, school }) => {
  return (
    <div className={styles.user_box} style={renderBgImage(avatar)}>
      <div className={styles.thumb_box}>
        <img src={avatar} alt="thumb" />
        <span className={styles.name}>{firstName}</span>
      </div>
      <div className={styles.area_name}>{school}</div>
    </div>
  )
}

UserInfo.propTypes = {
  avatar: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  school: PropTypes.string.isRequired,
}

export default UserInfo
