import { Link } from "react-router-dom";
import DeleteButton from "./components/DeleteButton";


const Equipments = ({ equipments, onDelete }) => {

  return (
    <>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Amount</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {equipments.map((equipment) => (
            <tr key={equipment.id}>
              <td>{equipment.name}</td>
              <td>{equipment.type}</td>
              <td>{equipment.amount}</td>
              <td>
                <div className="btn-group">
                  <Link to={`/equipment-handler/${equipment.id}`} className="btn btn-primary">
                    Update
                  </Link>
                  <DeleteButton equipmentId={equipment.id} onDelete={onDelete}/>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Equipments;
