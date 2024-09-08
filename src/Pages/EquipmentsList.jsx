import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import Equipments from "../Components/Equipments";
import { deleteEquipment, getAllEquipment } from "../client/equipments";
import { Outlet, Link } from "react-router-dom";

const Equipment = () => {

    const [loading, setLoading] = useState(true);
    const [equipments, setEquipments] = useState(null);

    const deleteEquipment = (id) =>
      setEquipments((equipments) =>
        equipments.filter((equipment) => equipment.id !== id)
      );

    useEffect(() => {
        let lock = false;
    
        setLoading(true);
        (async () => {
          const list = await getAllEquipment();
          if (!lock) {
            setEquipments(list);            
            setLoading(false);
          }
        })();
    
        return () => {
          lock = true;
        };
    }, []);

    if (loading) {
        return (<Loading />)
    }

    return (
        <>
        <h1 className="mb-3">Equipments</h1>
            <Equipments onDelete={deleteEquipment} equipments={equipments} />
            <Link to={`/equipment-handler/`} className="btn btn-primary">
              Create new Equipment
            </Link>
        </>
    )
}

export default Equipment