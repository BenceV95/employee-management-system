import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import { getAllEmployees } from "../client/employees";

const EmployeeList = () => {
  const [employees, setEmployees] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(null);

  const searchInEmployees = (searchObj) => {
    let { level, position, orderBy, sortBy } = searchObj;

    // check for sorting direction, off = asc, on = desc.
    if (!sortBy) {
      sortBy = "off";
    }
    //console.log(sortBy);

    //ordering
    if (orderBy != "none") {

      if (orderBy === "firstName" || orderBy === "middleName" || orderBy === "lastName") {

        const splitNames = employees.map(employee => {
          const sn = employee.name.split(" ", 3);
          if (sn.length <= 2) {
            employee.firstName = sn[0];
            employee.lastName = sn[1];
          } else if (sn.length == 3) {
            employee.firstName = sn[0];
            employee.middleName = sn[1];
            employee.lastName = sn[2];
          }

        });
        //console.log(employees);

        if (orderBy === "firstName") {
          if (sortBy === "off") {
            const orderedBy = employees.sort((a, b) => a.firstName.localeCompare(b.firstName));
            setEmployees([...orderedBy]);
          } else {
            const orderedBy = employees.sort((a, b) => b.firstName.localeCompare(a.firstName));
            setEmployees([...orderedBy]);
          }
        }

        if (orderBy === "middleName") {
          
          if (sortBy === "off") {
            const orderedBy = employees.filter(employee => employee.middleName).sort((a, b) => a.middleName.localeCompare(b.middleName));
            setEmployees([...orderedBy]);
          } else {
            const orderedBy = employees.filter(employee => employee.middleName).sort((a, b) => b.middleName.localeCompare(a.middleName));
            setEmployees([...orderedBy]);
          }
        }

        if (orderBy === "lastName") {
          if (sortBy === "off") {
            const orderedBy = employees.sort((a, b) => a.lastName.localeCompare(b.lastName));
            setEmployees([...orderedBy]);
          } else {
            const orderedBy = employees.sort((a, b) => b.lastName.localeCompare(a.lastName));
            setEmployees([...orderedBy]);
          }
        }

      }

      if (orderBy === "position") {
        if (sortBy === "off") {
          const orderedBy = employees.sort((a, b) => a.position.localeCompare(b.position));
          setEmployees([...orderedBy]);
        } else {
          const orderedBy = employees.sort((a, b) => b.position.localeCompare(a.position));
          setEmployees([...orderedBy]);
        }
      }

      if (orderBy === "level") {
        if (sortBy === "off") {
          const orderedBy = employees.sort((a, b) => a.level.localeCompare(b.level));
          setEmployees([...orderedBy]);
        } else {
          const orderedBy = employees.sort((a, b) => b.level.localeCompare(a.level));
          setEmployees([...orderedBy]);
        }
      }
    }

    // if search is reset then return original list    
    if (level === "" && position === "" && orderBy === "none") {

      console.log("resetting...");
      setEmployees(searching);
      return;

    } else if (level != "" || position != "") {

      // search level and or position
      let ret = employees.filter(employee => {
        const matchPosition = position != "" ? employee.position === position : true;
        const matchLevel = level != "" ? employee.level === level : true;
        return matchPosition && matchLevel;
      });
      setEmployees(ret);

    } else {
      console.log("else");

    }


  };


  const deleteEmployee = (id) =>
    setEmployees((employees) =>
      employees.filter((employee) => employee.id !== id)
    );

  useEffect(() => {
    let lock = false;

    setLoading(true);
    (async () => {
      const list = await getAllEmployees();
      if (!lock) {
        setEmployees(list);
        setSearching(list);
        setLoading(false);
      }
    })();

    return () => {
      lock = true;
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <EmployeeTable onDelete={deleteEmployee} employees={employees} searchB={searchInEmployees} />;
};

export default EmployeeList;
