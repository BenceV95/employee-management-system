import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import { searchNameFromData } from "../client/employees";

const Search = () => {

    const { name = "" } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [employee, setEmployee] = useState(null);
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        let lock = false;

        setLoading(true);
        (async () => {
            const data = await searchNameFromData(name);
            if (!lock) {
                setEmployee(data[0]);
                setLoading(false);
            }
        })();

        return () => {
            lock = true;
        };
    }, [name]);

    if (loading) {
        return <Loading />
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const entries = [...formData.entries()];
        const employee = Object.fromEntries(entries);
        //console.log(employee);
        setSearched(true);
        navigate(`/search/${employee.name}`);

    };


    return (
        <div className="border p-3">
            <h1>Search Name:</h1>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="name">Name:</label>
                    <input
                        className="form-control"
                        defaultValue={employee ? employee.name : null}
                        name="name"
                        id="name"
                        required
                    />
                </div>
                <div className="d-flex justify-content-start gap-3">
                    <button type="submit" className="btn btn-primary">
                        Find Employee
                    </button>
                </div>
            </form>

            {
                searched &&
                (
                    <div className="d-flex flex-column mt-5">
                        <p>Name: {employee?.name}</p>
                        <p>Level: {employee?.level}</p>
                        <p>Position: {employee?.position}</p>
                    </div>
                )

            }
        </div>
    )
}

export default Search