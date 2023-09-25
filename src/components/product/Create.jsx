import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../App';

import ProductService from '../../services/productService';
import LocationRegionService from '../../services/locationRegionService';

const Create = () => {
  const { products, setProducts } = useContext(UserContext);

  const [provinces, setProvinces] = useState([]);

  const [locationRegion, setLocationRegion] = useState({
    provinceId: 0,
    provinceName: '',
  });

  const [product, setProduct] = useState({
    title: '',
    price: 0,
    locationRegion: {},
  });

  const handleGetAllProvinces = async () => {
    const dataProvinces = await LocationRegionService.getAllProvinces();
    setProvinces(dataProvinces.data.results);
  };

  const handleOnChangeProduct = (e) => {
    const text = e.target.value;
    setProduct({
      ...product,
      [e.target.name]: text,
    });
  };

  const handleOnChangeLocation = (e) => {
    const provinceId = e.target.value;
    const index = e.nativeEvent.target.selectedIndex;
    const provinceName = e.nativeEvent.target[index].text;

    setLocationRegion({
      ...locationRegion,
      provinceId,
      provinceName,
    });
  };

  const handleCreateProduct = () => {
    ProductService.create(product);
    setProduct({ title: '', price: 0, locationRegion });
  };

  useEffect(() => {
    setProduct({
      ...product,
      locationRegion,
    });
  }, [locationRegion]);

  useEffect(() => {
    handleGetAllProvinces();
  }, []);

  return (
    <>
      <section>
        <div className="d-flex align-items-center">
          <h3 className="text-primary me-3">Product Detail</h3>
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
              <div className="col-lg-6">
                <label htmlFor="province">Province</label>
                <select
                  className="form-control"
                  name="province"
                  id="province"
                  onChange={(e) => handleOnChangeLocation(e)}
                >
                  {provinces.length &&
                    provinces.map((item) => {
                      return (
                        <option value={item.province_id} key={item.province_id}>
                          {item.province_name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-3">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={handleCreateProduct}
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Create;
