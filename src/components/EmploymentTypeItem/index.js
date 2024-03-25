import './index.css'

const EmploymentTypeItem = props => {
  const {type, updateEmploymetTypes} = props
  const {label, employmentTypeId} = type
  const onClickCheckbox = () => {
    updateEmploymetTypes(employmentTypeId)
  }
  return (
    <li className="employment-type-item">
      <input
        onClick={onClickCheckbox}
        id={employmentTypeId}
        type="checkbox"
        className="checkbox-input"
        value={employmentTypeId}
      />
      <label htmlFor={employmentTypeId} className="checkbox-label">
        {label}
      </label>
    </li>
  )
}

export default EmploymentTypeItem
