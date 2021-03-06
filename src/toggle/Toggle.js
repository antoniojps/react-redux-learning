import React from 'react'
import { connect } from 'react-redux'
import { toggleMessage } from './actions'
import { bindActionCreators } from 'redux'

const Toggle = ({ messageVisibility, toggleMessage, getMovies }) => (
      <div>
    {messageVisibility &&
      <p>Toggled</p>
    }
    <button onClick={toggleMessage}>Toggle Me</button>
      </div>
    )

const mapStateToProps = ({ toggle: { messageVisibility }}) => ({
  messageVisibility
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleMessage,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Toggle)
