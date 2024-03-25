import {Component} from 'react'
import Cookies from 'js-cookie'

import {RiShareBoxFill} from 'react-icons/ri'
import {FaSuitcase, FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'

import SimilarJobsItem from '../SimilarJobsItem'
import Header from '../Header'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: {},
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const {job_details} = data
      const {similar_jobs} = data
      const updatedData = {
        companyLogoUrl: job_details.company_logo_url,
        companyWebsiteUrl: job_details.company_website_url,
        employmentType: job_details.employment_type,
        id: job_details.id,
        jobDescription: job_details.job_description,
        skills: job_details.skills.map(eachItem => ({
          imageUrl: eachItem.image_url,
          name: eachItem.name,
        })),
        lifeAtCompany: {
          description: job_details.life_at_company.description,
          imageUrl: job_details.life_at_company.image_url,
        },
        location: job_details.location,
        packagePerAnnum: job_details.package_per_annum,
        rating: job_details.rating,
        title: job_details.title,
      }
      const updatedSimilarJobsList = similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      console.log(updatedData)
      this.setState({
        jobDetails: updatedData,
        apiStatus: apiStatusConstants.success,
        similarJobs: updatedSimilarJobsList,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails
    return (
      <div className="job-content-page">
        <div className="details-item-container">
          <div className="details-logo-container">
            <img
              className="details-logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div className="details-role-container">
              <h1 className="details-role">{title}</h1>
              <div className="details-rating-container">
                <FaStar className="details-star-icon" />
                <p className="details-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="details-info-container">
            <div className="details-location-container">
              <MdLocationOn className="details-info-icon" />
              <p className="details-info-content">{location}</p>
              <FaSuitcase className="details-info-icon" />
              <p className="details-info-content">{employmentType}</p>
            </div>
            <p className="details-annual-package">{packagePerAnnum}</p>
          </div>
          <div className="details-description-container">
            <h1 className="details-job-heading">Description</h1>
            <a className="visit" href={companyWebsiteUrl} target="_blank">
              Visit
              <RiShareBoxFill className="visit-icon" />
            </a>
          </div>
          <p className="details-job-description">{jobDescription}</p>
          <h1 className="details-job-heading">Skills</h1>
          <ul className="skills-list-container">
            {skills.map(eachItem => (
              <li key={eachItem.name} className="skills-item-container">
                <img
                  className="skills-image"
                  src={eachItem.imageUrl}
                  alt={eachItem.name}
                />
                <p className="skills-name">{eachItem.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="details-job-heading">Life at Company</h1>
          <div className="company-container">
            <p className="company-description">{lifeAtCompany.description}</p>
            <img
              className="company-image"
              src={lifeAtCompany.imageUrl}
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobs.map(eachItem => (
            <SimilarJobsItem key={eachItem.id} similarJob={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderDifferentViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'FAILURE':
        return <FailureView callFunction={this.getJobDetails} />
      default:
        return <LoaderView />
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-page">{this.renderDifferentViews()}</div>
      </>
    )
  }
}

export default JobItemDetails
