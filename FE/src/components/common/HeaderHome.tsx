/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable array-callback-return */
import { Button, Typography } from '@mui/material';
import categoryApi from 'api/category';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions, selecttorsIsLoggedIn } from 'features/auth/authSlice';
import { ListResponse } from 'models';
import { Brands, Category } from 'models/category';
import { InputText } from 'primereact/inputtext';
import { Menubar } from 'primereact/menubar';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './header.css';

export function HeaderHome() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const isLoggedIn = useAppSelector(selecttorsIsLoggedIn);

  const [category, SetCategory] = useState<ListResponse<Category>>();

  const handleLogoutClick = () => {
    dispatch(authActions.logout());
  };

  const handlePathHome = () => {
    history.push('/');
  };
  const handlePathLogin = () => {
    history.push('/login');
  };

  useEffect(() => {
    async function loadCategory() {
      const res: ListResponse<Category> = await categoryApi.getAll();
      SetCategory(res);
    }
    loadCategory();
  }, []);
  const Tiem: { id: string | undefined; label: string | undefined; icon: string; items: {}[] }[] =
    [];
  // eslint-disable-next-line array-callback-return
  category?.data.map((category: Category) => {
    const brands = category.brands;
    const newLocal: {}[] = [];
    const Item = {
      id: category.id,
      label: category.name,
      icon: '',
      command: () => {
        history.push(`/${category.name}`);
      },
      // eslint-disable-next-line no-empty-pattern
      items: newLocal,
    };
    // eslint-disable-next-line array-callback-return
    brands.map((brand: Brands) => {
      let itemChil = {
        id: '',
        label: '',
        icon: '',
        command: () => {
          history.push(`/${brand.name}`);
        },
      };
      itemChil.id = brand.id ? brand?.id : '';
      itemChil.label = brand.name ? brand.name : '';
      Item.items.push(itemChil);
    });

    Tiem.push(Item);
  });

  const items = Tiem;

  const end = <InputText placeholder="Search" type="text" />;

  return (
    <header className="header">
      <div className="container">
        <div className="row row-header">
          <div className="col-1 logo">
            <Typography
              className="box"
              onClick={handlePathHome}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <Button color="inherit">Logo</Button>
            </Typography>
          </div>
          <div className="col-10 menu">
            <Menubar model={items} end={end} />
          </div>
          <div className="col-1 users">
            {isLoggedIn ? (
              <Button color="inherit" onClick={handleLogoutClick}>
                Logout
              </Button>
            ) : (
              <Button color="inherit" onClick={handlePathLogin}>
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
