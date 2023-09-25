import React, { useState, useEffect, createContext, useContext } from 'react';
import StudentService from '../../services/studentService';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';

import { UserContext } from '../../App';

const StudentList = () => {
  const { setUser } = useContext(UserContext);

  const [cities, setCities] = useState([]);

  const handleSetUser = () => {
    setUser('Hello');
  };

  // const [user, setUser] = useState('Jesse Hall');

  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(false);

  function uniqBy(a, key) {
    var seen = {};
    return a.filter(function (item) {
      var k = key(item);
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
  }

  const handleChangeCity = async (e) => {
    const cityName = e.target.value;

    try {
      const searchByCity = await StudentService.searchByCity(cityName);

      setStudentList(searchByCity.data);
    } catch (e) {}
  };

  const notify = () =>
    toast.error('🦄 Wow so easy!', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  const myFunction = () => {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire('Saved!', '', 'success');
        notify();
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  };

  useEffect(() => {
    try {
      setLoading(true);
      async function getData() {
        let studetnRes = await StudentService.getStudents();
        let studentData = studetnRes.data;

        let citiesTemp = [];

        studentData.map((item) => {
          citiesTemp.push(item.city);
        });

        citiesTemp = uniqBy(citiesTemp, JSON.stringify);
        setCities(citiesTemp);

        studentData.sort((a, b) => (a.updatedAt > b.updatedAt ? 1 : -1));
        setStudentList(studentData);
        setLoading(false);
      }

      getData();
    } catch (error) {}
  }, []);

  return (
    <>
      <ToastContainer />
      {/* <SweetAlert2 {...swalProps} /> */}

      <section>
        <div className="d-flex align-items-center">
          <h3 className="text-warning me-3">Student List</h3>
          <button
            className="btn btn-sm btn-outline-success"
            onClick={handleSetUser}
          >
            <i className="fa fa-plus me-2" />
            Add Student
          </button>
        </div>
        <p className="fst-italic">
          Deserunt ut pariatur tempor aute incididunt Lorem esse. Pariatur
          dolore aute esse eu pariatur voluptate in amet excepteur occaecat
          culpa eiusmod. Non qui labore anim do dolore magna deserunt amet
          commodo Lorem aliquip.
        </p>
      </section>
      <section>
        <div className="d-flex align-items-center col-4">
          <label htmlFor="city">City</label>
          <select
            name=""
            id="city"
            className="form-select"
            onChange={handleChangeCity}
          >
            {cities.length &&
              cities.map((item) => {
                return <option value={item}>{item}</option>;
              })}
          </select>
        </div>
      </section>
      <section className="mt-2">
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <table className="table table-striped table-hover">
              <thead className="table-warning">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>City</th>
                  {/* <th>Mark</th> */}
                  <th>Actionts</th>
                </tr>
              </thead>
              <tbody>
                {studentList.length &&
                  studentList.map((std) => (
                    <tr>
                      <td>{std.id}</td>
                      <td>{std.name}</td>
                      <td>{std.age}</td>
                      <td>{std.gender}</td>
                      <td>{std.city}</td>
                      {/* <td>{std.mark}</td> */}
                      <td>
                        <Link to={`/student/detail/${std.id}`}>Detail</Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
};

export default StudentList;
