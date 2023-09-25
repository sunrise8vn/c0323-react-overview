import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { UserContext } from '../../App';

import ProductService from '../../services/productService';

const Edit = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const { id } = useParams();

  const handleOnChangeProduct = (e) => {
    const text = e.target.value;
    setProduct({
      ...product,
      [e.target.name]: text,
    });
  };

  const getProductById = async (id) => {
    const product = await ProductService.getById(id);

    setProduct(product.data);
  };

  const handleUpdateProduct = async () => {
    await ProductService.update(id, product);

    navigate('/products');
  };

  useEffect(() => {
    getProductById(id);
  }, []);

  return (
    <>
      <section>
        <div className="d-flex align-items-center">
          <h3 className="text-primary me-3">Update Product</h3>
          <Link className="btn btn-sm btn-outline-primary" to={'/products'}>
            <i className="fa fa-arrow-left me-2" />
            Back To Product List
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
          <form action="" className="col-lg-12">
            <div className="row mt-3">
              <div className="col-lg-6">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={product.title}
                  onChange={(e) => handleOnChangeProduct(e)}
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  value={product.price}
                  onChange={(e) => handleOnChangeProduct(e)}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-3">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleUpdateProduct}
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Edit;
