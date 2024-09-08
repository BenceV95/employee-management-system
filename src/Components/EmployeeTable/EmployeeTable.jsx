import { Link } from "react-router-dom";
import DeleteButton from "./components/DeleteButton";


const EmployeeTable = ({ employees, onDelete, searchB }) => {

  const searchA = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];
    const search = Object.fromEntries(entries);
    console.log(search);
    return searchB(search);

  };

  return (
    <>
      <div className="container">
        <form onSubmit={searchA} className="d-flex flex-row justify-content-between align-items-center mb-3 border p-2">

          <input type="text" placeholder="Level" name="level"></input>
          
          <input type="text" placeholder="Position" name="position"></input>
          
          <label htmlFor="orderBy">Order By: </label>
          <select name="orderBy" id="orderBy">
            <option defaultValue="none" value="none">None (reset)</option>
            <option value="firstName">First Name</option>
            <option value="middleName">Middle Name</option>
            <option value="lastName">Last Name</option>
            <option value="position">Position</option>
            <option value="level">Level</option>
          </select>

          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" name="sortBy"></input>
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">ABC - ZYX (asc, desc)</label>
          </div>

          <button type="submit" className="btn btn-primary">Search</button>

        </form>
      </div>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Position</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.level}</td>
              <td>{employee.position}</td>
              <td>
                <div className="btn-group">
                  <Link to={`/update/${employee.id}`} className="btn btn-primary">
                    Update
                  </Link>
                  <DeleteButton employeeId={employee.id} onDelete={onDelete} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default EmployeeTable;
