import {Link} from 'react-router-dom'
import {FaSuitcase, FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="job-item-container">
      <li>
        <div className="job-logo-container">
          <img className="job-logo" src={companyLogoUrl} alt="company logo" />
          <div className="job-role-container">
            <h1 className="job-role">{title}</h1>
            <div className="rating-container">
              <FaStar className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-info-container">
          <div className="location-container">
            <MdLocationOn className="info-icon" />
            <p className="info-content">{location}</p>
            <FaSuitcase className="info-icon" />
            <p className="info-content">{employmentType}</p>
          </div>
          <p className="annual-package">{packagePerAnnum}</p>
        </div>
        <h1 className="job-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
