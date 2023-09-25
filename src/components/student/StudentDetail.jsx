import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import StudentService from '../../services/studentService';
import Spinner from '../layout/Spinner';

import { UserContext } from '../../App';

const StudetnDetail = () => {
  const { studentId } = useParams();
  const [studentDetail, setStudentDetail] = useState({});
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);

  //   console.log(user);

  useEffect(() => {
    try {
      setLoading(true);
      async function getData() {
        let studentRes = await StudentService.getStudent(studentId);
        setStudentDetail(studentRes.data);
        setLoading(false);
      }
      getData();
    } catch (error) {}
  }, [studentId]);

  const { name, age, gender, mark, city } = studentDetail;
  return (
    <>
      <section>
        <div className="d-flex align-items-center">
          <h3 className="text-primary me-3">Student Detail</h3>
          <Link className="btn btn-sm btn-outline-primary" to={'/student/list'}>
            <i className="fa fa-arrow-left me-2" />
            Back To Student List
          </Link>
        </div>
        <p className="fst-italic">
          Sit sint eiusmod reprehenderit nulla sunt incididunt. Excepteur ex
          aliqua ipsum eiusmod qui minim proident occaecat nulla velit occaecat.
          Ex cupidatat mollit exercitation et proident Lorem sunt duis magna
          exercitation dolor pariatur. Reprehenderit Lorem culpa ullamco
          cupidatat laborum laborum nulla. Et mollit occaecat voluptate laboris
          et eiusmod anim. Excepteur incididunt reprehenderit eu excepteur.
          Ipsum sit consectetur ad quis ex laborum officia dolor.
        </p>
      </section>
      <section>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="card row col-md-5">
              <div className="card-header">{name}</div>
              <div className="card-body">
                <p>Gender: {gender}</p>
                <p>Age: {age}</p>
                <p>City: {city}</p>
                <p>Mark: {mark}</p>
              </div>
            </div>
            <div className="card row col-md-5">
              <div className="card-header">{user}</div>
              <div className="card-body"></div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default StudetnDetail;
