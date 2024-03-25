import {FaSuitcase, FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const SimilarJobsItem = props => {
  const {similarJob} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJob
  return (
    <li className="similar-job-item-container">
      <div className="job-logo-container">
        <img
          className="job-logo"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div className="job-role-container">
          <h1 className="job-role">{title}</h1>
          <div className="rating-container">
            <FaStar className="star-icon" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="job-heading">Description</h1>
      <p className="job-description">{jobDescription}</p>
      <div className="location-container">
        <MdLocationOn className="info-icon" />
        <p className="info-content">{location}</p>
        <FaSuitcase className="info-icon" />
        <p className="info-content">{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJobsItem
