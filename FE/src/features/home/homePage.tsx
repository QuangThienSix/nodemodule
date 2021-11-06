import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  productActios, selectTop5ActiveList,
  selectTop5PriceList,
  selectTop5Ratting
} from 'features/product/productSlice';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import React, { useEffect } from 'react';
import './homePage.css';
export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
  // const { category, loading } = useCategory();

  const Top5RattingList = useAppSelector(selectTop5Ratting);
  const Top5PriceList = useAppSelector(selectTop5PriceList);
  const Top5ActiveList = useAppSelector(selectTop5ActiveList);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(productActios.fetchData());
  }, [dispatch]);

  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '600px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '480px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
  const productTemplate = (product: any) => {
    return (
      <div className="product-item">
        <div className="product-item-content text-center">
          <div className="p-mb-3">
            <img
              src={`showcase/demo/images/product/${product.images}`}
              onError={(e: any) =>
                (e.target.src =
                  'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
              }
              alt={product.name}
              className="product-image"
            />
          </div>
          <div>
            <h4 className="p-mb-1">{product.name}</h4>
            <h6 className="p-mt-0 p-mb-3">Starting price: {product.price}</h6>
            <div className="car-buttons p-mt-5">
              <Button icon="pi pi-search" className="p-button p-button-rounded p-mr-2" />
              <Button icon="pi pi-star" className="p-button-success p-button-rounded p-mr-2" />
              <Button icon="pi pi-cog" className="p-button-help p-button-rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="home-page">
      {/* Top5RattingList */}
      <section>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="carousel-demo">
                <div className="card" style={{ border: 'none' }}>
                  <Carousel
                    value={Top5RattingList}
                    numVisible={4}
                    numScroll={1}
                    responsiveOptions={responsiveOptions}
                    className="custom-carousel"
                    circular
                    autoplayInterval={3000}
                    itemTemplate={productTemplate}
                    header={<h5>Sản Phẩm Top 5 Ratting</h5>}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Top5PriceList */}
      <section>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="carousel-demo">
                <div className="card" style={{ border: 'none' }}>
                  <Carousel
                    value={Top5PriceList}
                    numVisible={4}
                    numScroll={1}
                    responsiveOptions={responsiveOptions}
                    className="custom-carousel"
                    circular
                    autoplayInterval={3000}
                    itemTemplate={productTemplate}
                    header={<h5>Sản Phẩm Top 5 Price</h5>}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Top5ActiveList */}
      <section>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="carousel-demo">
                <div className="card" style={{ border: 'none' }}>
                  <Carousel
                    value={Top5ActiveList}
                    numVisible={4}
                    numScroll={1}
                    responsiveOptions={responsiveOptions}
                    className="custom-carousel"
                    circular
                    autoplayInterval={3000}
                    itemTemplate={productTemplate}
                    header={<h5>Sản Phẩm Top 5 Active</h5>}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
