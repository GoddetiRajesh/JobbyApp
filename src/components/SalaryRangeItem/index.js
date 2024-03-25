import './index.css'

const SalaryRangeItem = props => {
  const {range, updateSalaryRange} = props
  const {label, salaryRangeId} = range
  const onClickRadio = () => {
    updateSalaryRange(salaryRangeId)
  }
  return (
    <li className="salary-range-item">
      <input
        onClick={onClickRadio}
        id={salaryRangeId}
        type="radio"
        className="radio-input"
        name="salary"
        value={salaryRangeId}
      />
      <label htmlFor={salaryRangeId} className="radio-label">
        {label}
      </label>
    </li>
  )
}

export default SalaryRangeItem
