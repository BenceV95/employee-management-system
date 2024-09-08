import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreateEquipment from "../Components/Equipments/components/CreateEquipment"
import { createEquipment, getOneEquipmentById, updateEquipment } from "../client/equipments";

const EquipmentHandler = ({ type }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [mutating, setMutating] = useState(false);
  const [equipment, setEquipment] = useState(null);


  useEffect(() => {
    let lock = false;

    setLoading(true);
    (async () => {
      const data = await getOneEquipmentById(id);
      if (!lock) {
        setEquipment(data);
        setLoading(false);
      }
    })();

    return () => {
      lock = true;
    };
  }, [id]);


  const handleUpdateEquipment = async (equipment) => {
    setMutating(true);
    await updateEquipment(id, equipment);
    setMutating(false);
    navigate("/equipments");
  };


  const handleCreateEquipment = async (Equipment) => {
    setLoading(true);
    await createEquipment(Equipment);
    setLoading(false);
    navigate("/equipments");
  };

  let create = false;
  if (type === "create") {
    create = true;
  }

  return (
    <>
      {create ? (<CreateEquipment
        disabled={loading}
        onCancel={() => navigate("/equipments")}
        onSave={handleCreateEquipment}
        type={type}
      />) : (<CreateEquipment
        equipment={equipment}
        onSave={handleUpdateEquipment}
        disabled={mutating}
        onCancel={() => navigate("/equipments")}
        type={type}
      />)}
    </>
  );
};

export default EquipmentHandler;