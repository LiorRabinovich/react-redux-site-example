export const loginAction = (email, password, redirect, history) => {
  return async (dispatch) => {
    const requestObject = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }

    let data = await window.fetch(`https://reqres.in/api/login`, requestObject);
    data = await data.json();

    if (data.token) {
      dispatch({ type: 'SET_LOGGED_IN', payload: true });
      history.push(redirect);
    } else if (data.error) {
      alert(data.error);
    } else {
      alert('email or password wrong!');
    }
  };
};

export const getUsersAction = (pageNumber) => {
  return async (dispatch) => {
    dispatch({ type: 'SET_LOADER_ACTIVE', payload: true });
    let users = await window.fetch(`https://reqres.in/api/users?page=${pageNumber}`);
    users = await users.json();
    dispatch({ type: 'SET_USERS', payload: users });
    dispatch({ type: 'SET_LOADER_ACTIVE', payload: false });
  };
};

export const getUserAction = (userID) => {
  return async (dispatch) => {
    dispatch({ type: 'SET_LOADER_ACTIVE', payload: true });
    let user = await window.fetch(`https://reqres.in/api/users/${userID}`);
    user = await user.json();
    dispatch({ type: 'SET_USER', payload: user.data });
    dispatch({ type: 'SET_LOADER_ACTIVE', payload: false });
  };
};