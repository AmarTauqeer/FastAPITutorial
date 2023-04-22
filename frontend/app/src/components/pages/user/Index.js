import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const url = "http://localhost:8001/";

const Index = () => {
  const [users, setUsers] = useState([]);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    pass: "",
    id: "",
  });

  const clearUserInput = () => {
    setUserInput({
      name: "",
      email: "",
      pass: "",
      id: "",
    });
  };

  const fetchUsers = () => {
    axios
      .get(`${url}`)
      .then((response) => {
        const data = response.data;
        // console.log(data);
        setUsers(data);
      })
      .catch((e) => {
        // Placeholder
        console.log(e);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(userInput);
    const data = {
      name: userInput.name,
      email: userInput.email,
      password: userInput.pass,
    };

    axios.post(`${url}`, data).then((response) => {
      if (response) {
        fetchUsers();
        toast("The record is inserted successfully!");
        clearUserInput();
      }
    });
  };

  const handleSubmitUpdate = (e, id) => {
    e.preventDefault();
    const data = {
      id: id,
      name: userInput.name,
      email: userInput.email,
      password: userInput.pass,
    };

    axios.put(`${url}${id}`, data).then((response) => {
      if (response) {
        fetchUsers();
        toast("The record is updated successfully!");
        // clearUserInput();
      }
    });
  };

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id) => {
    await axios.delete(`${url}${id}`);
    fetchUsers();
    toast("The record is deleted successfully!");
    clearUserInput();
  };

  const handleEdit = (id, name, email, pass) => {
    setUserInput({
      name: name,
      email: email,
      pass: pass,
      id: id,
    });
  };
  return (
    <>
      <h4 className="text-center mt-5">User Information</h4>
      <button
        className="btn btn-info btn-sm mb-3"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        onClick={(e) => clearUserInput()}
      >
        Add
      </button>
      <table className="table table-striped">
        <thead>
          <tr className="table-primary">
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            <>
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td><input type="password" value={user.password} disabled style={{border:"none"}} /></td>
                    <td>
                      <button
                        type="button"
                        onClick={(e) =>
                          handleEdit(
                            user.id,
                            user.name,
                            user.email,
                            user.password
                          )
                        }
                        className="btn btn-warning btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdropEdit"
                      >
                        Edit
                      </button>
                      &nbsp;
                      <button
                        className="btn btn-danger btn-sm"
                        type="button"
                        onClick={(e) => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </>
          ) : (
            <span>No reacord is found</span>
          )}
        </tbody>
      </table>

      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                Add user info
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form
                onSubmit={handleSubmit}
                className="was-validated"
                noValidate
              >
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={userInput.name}
                    onChange={handleChange}
                    class="form-control form-control-sm"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    required
                  />
                  <div class="invalid-feedback">Please choose a username.</div>
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Email address
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={userInput.email}
                    onChange={handleChange}
                    class="form-control form-control-sm"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    required
                  />
                  <div id="emailHelp" class="form-text">
                    We'll never share your email with anyone else.
                  </div>
                  <div class="invalid-feedback">
                    Please choose a valid email address.
                  </div>
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Password
                  </label>
                  <input
                    name="pass"
                    type="password"
                    value={userInput.pass}
                    onChange={handleChange}
                    class="form-control form-control-sm"
                    id="exampleInputPassword1"
                    required
                  />
                  <div class="invalid-feedback">
                    Please choose a user password.
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary btn-sm"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                class="btn btn-success btn-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* edit modal */}
      <div
        class="modal fade"
        id="staticBackdropEdit"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                Edit user info
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form
                onSubmit={handleSubmit}
                className="was-validated"
                noValidate
              >
                <input type="hidden" value={userInput.id} />
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={userInput.name}
                    onChange={handleChange}
                    class="form-control form-control-sm"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    required
                  />
                  <div class="invalid-feedback">Please choose a username.</div>
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Email address
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={userInput.email}
                    onChange={handleChange}
                    class="form-control form-control-sm"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    required
                  />
                  <div id="emailHelp" class="form-text">
                    We'll never share your email with anyone else.
                  </div>
                  <div class="invalid-feedback">
                    Please choose a valid email address.
                  </div>
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Password
                  </label>
                  <input
                    name="pass"
                    type="password"
                    value={userInput.pass}
                    onChange={handleChange}
                    class="form-control form-control-sm"
                    id="exampleInputPassword1"
                    required
                  />
                  <div class="invalid-feedback">
                    Please choose a user password.
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary btn-sm"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={(e) => handleSubmitUpdate(e, userInput.id)}
                class="btn btn-success btn-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Index;
