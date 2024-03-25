import EmploymentTypeItem from '../EmploymentTypeItem'
import SalaryRangeItem from '../SalaryRangeItem'

import './index.css'

const Filters = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    updateEmploymetTypes,
    updateSalaryRange,
  } = props
  return (
    <>
      <div className="employment-types-container">
        <h1 className="employment-types-heading">Types of Employment</h1>
        <ul className="employment-types-list">
          {employmentTypesList.map(eachItem => (
            <EmploymentTypeItem
              key={eachItem.employmentTypeId}
              type={eachItem}
              updateEmploymetTypes={updateEmploymetTypes}
            />
          ))}
        </ul>
      </div>
      <div className="employment-types-container">
        <h1 className="employment-types-heading">Salary Range</h1>
        <ul className="employment-types-list">
          {salaryRangesList.map(eachItem => (
            <SalaryRangeItem
              key={eachItem.salaryRangeId}
              range={eachItem}
              updateSalaryRange={updateSalaryRange}
            />
          ))}
        </ul>
      </div>
    </>
  )
}

export default Filters
