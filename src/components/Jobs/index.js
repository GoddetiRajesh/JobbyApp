import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Profile from '../Profile'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'
import JobCard from '../JobCard'
import Filters from '../Filters'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobsList: [],
    searchValue: '',
    employmentTypes: [],
    salaryRange: '',
  }

  componentDidMount() {
    this.getjobs()
  }

  getjobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchValue, employmentTypes, salaryRange} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes.join()}&minimum_package=${salaryRange}&search=${searchValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const {jobs} = data
      const updatedList = jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobsList: updatedList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  updateSearchValue = event => {
    this.setState({searchValue: event.target.value})
  }

  onClickSearch = () => {
    this.getjobs()
  }

  updateEmploymetTypes = id => {
    const {employmentTypes} = this.state
    if (employmentTypes.includes(id)) {
      this.setState(
        prev => ({
          employmentTypes: prev.employmentTypes.filter(
            eachItem => eachItem !== id,
          ),
        }),
        this.getjobs,
      )
    } else {
      this.setState(
        prev => ({
          employmentTypes: [...prev.employmentTypes, id],
        }),
        this.getjobs,
      )
    }
  }

  updateSalaryRange = id => {
    this.setState({salaryRange: id}, this.getjobs)
  }

  renderSuccessView = () => {
    const {jobsList} = this.state
    return jobsList.length === 0 ? (
      <div className="no-jobs-container">
        <img
          className="no-jobs-image"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="no-jobs-found-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    ) : (
      <ul className="jobs-list-container">
        {jobsList.map(eachItem => (
          <JobCard key={eachItem.id} jobDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderDifferentViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'FAILURE':
        return <FailureView callFunction={this.getjobs} />
      default:
        return <LoaderView />
    }
  }

  render() {
    const {searchValue} = this.state
    return (
      <>
        <Header />
        <div className="jobs-page-container">
          <div className="card-1-container">
            <div className="mobile-search-container">
              <input
                onChange={this.updateSearchValue}
                type="search"
                className="search-input"
                placeholder="Search"
                value={searchValue}
              />
              <button
                onClick={this.onClickSearch}
                className="search-button"
                type="button"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="profile-container">
              <Profile />
            </div>
            <div className="filters-container">
              <Filters
                employmentTypesList={employmentTypesList}
                salaryRangesList={salaryRangesList}
                updateEmploymetTypes={this.updateEmploymetTypes}
                updateSalaryRange={this.updateSalaryRange}
              />
            </div>
          </div>
          <div className="card-2-container">
            <div className="desktop-search-container">
              <input
                onChange={this.updateSearchValue}
                type="search"
                className="search-input"
                placeholder="Search"
                value={searchValue}
              />
              <button
                onClick={this.onClickSearch}
                className="search-button"
                type="button"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderDifferentViews()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
