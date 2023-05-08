import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import Posts from '../posts/Posts';
function Users() {
    let initialState = {
        data: undefined,
        error: undefined,
        loading: false,
    };
    const [users, setUsers] = useState(initialState);
    const [selectedUser, setSelectedUser] = useState(0);

    const getUsersData = () => {
        setUsers((oldData) => ({
            ...oldData,
            loading: true,
            error: undefined,
            data: undefined,
        }));

        axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then(({ data }) => {
                setUsers((oldData) => ({
                    ...oldData,
                    data: data,
                    loading: false,
                    error: undefined,
                }));
            })
            .catch((err) => {
                setUsers({ data: undefined, loading: false, error: err.toString() });
            });
    };

    useEffect(() => {
        getUsersData();
    }, []);

    const handleUserSelect = (e) => {
        setSelectedUser(parseInt(e.target.value));
    };

    return (
        <>
            {users.error && <h5 color="red">Error occured ....</h5>}
            {users.loading && <Spinner />}
            {users.data &&
                <>
                    <Form style={{ width: "30%" }}>
                        <FormGroup>
                            <Label for="exampleSelect">Users</Label>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                                onChange={handleUserSelect}
                            >
                                <optgroup label="Select User">
                                    <option value="0">All Users</option>
                                    {users?.data &&
                                        users?.data?.map((user) => (
                                            <option key={user.id} value={user.id}>
                                                {user.name}
                                            </option>
                                        ))}
                                </optgroup>
                            </Input>
                        </FormGroup>
                    </Form>
                    <Posts selectedUser={selectedUser} />
                </>
            }
        </>
    );
}


export default Users