import './index.css'

const FailureView = props => {
  const {callFunction} = props
  const onClickRetry = () => {
    callFunction()
  }
  return (
    <div className="failure-view-container">
      <img
        className="failure-view-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        onClick={onClickRetry}
        type="button"
        className="failure-view-button"
      >
        Retry
      </button>
    </div>
  )
}

export default FailureView
