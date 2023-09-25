import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../App';
import ProductService from '../../services/productService';

const List = () => {
  const { products, setProducts } = useContext(UserContext);

  const handleGetAll = async () => {
    const products = await ProductService.getAlls();

    setProducts(products.data);
  };

  useEffect(() => {
    handleGetAll();
  }, []);

  return (
    <>
      <section>
        <div className="d-flex align-items-center">
          <h3 className="text-primary me-3">Product List</h3>
          <Link
            className="btn btn-sm btn-outline-primary"
            to={'/products/create'}
          >
            <i className="fa fa-arrow-left me-2" />
            Create Product
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
        <div className="d-flex">
          <table className="table table-hover">
            <thead>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </thead>
            <tbody>
              {products.length &&
                products.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.price}</td>
                      <td>
                        <Link to={`/products/${item.id}`} replace>
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                          >
                            Edit
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default List;
