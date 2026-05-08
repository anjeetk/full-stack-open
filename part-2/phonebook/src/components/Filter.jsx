const Filter = ({ searchKey, handleSearch }) => {
  return (
    <div>
      filter shown with
      <input
        value={searchKey}
        onChange={handleSearch}
      />
    </div>
  )
}

export default Filter