import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getUsersAction } from '../Store/Actions'

class Users extends Component {
  componentWillMount(){
    this.props.getUsers(this.pageNumber);
  }
  get pageNumber() {
    const isPageNumber = typeof this.props.match.params.pageNumber !== 'undefined';
    return (isPageNumber?this.props.match.params.pageNumber:1)
  }
  getUsersDOM() {
    let usersItems = this.props.users.data.map((value, index) => (
      <tr className="pointer" key={value.id} onClick={ () => this.handleClickUser(value.id) }>
        <th>{value.id}</th>
        <td>{value.first_name}</td>
        <td>{value.last_name}</td>
      </tr>
    ));
    return (
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {usersItems}
          </tbody>
        </table>
      </div>
    );
  }
  getPagesDOM() {
    if (this.props.users.total_pages !== null) {
      let pagesItems = [];
      for (let pageNumber = 1; pageNumber < this.props.users.total_pages; pageNumber++) {
        let className = 'button';
        if(this.props.users.page === pageNumber){
          className += ' active';
        }
        pagesItems.push(
          <button className={className} key={pageNumber} onClick={ () => this.handleClickPage(pageNumber) }>{pageNumber}</button>
        );
      }
      return (<div className="group-button">{pagesItems}</div>);
    }
    return;
  }
  handleClickPage = (pageNumber) => {
    if(this.props.users.page !== pageNumber){
      this.props.history.push(`/users/${pageNumber}`);
      this.props.getUsers(pageNumber);
    }
  }
  handleClickUser = (userID) => {
    this.props.history.push(`/user/${userID}`);
  }
  render() {
    const usersDOM = this.getUsersDOM();
    const pagesDOM = this.getPagesDOM();
    return (
      <div className="users">
        <h1>USERS</h1>
        {usersDOM}
        {pagesDOM}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers(pageNumber) {
      dispatch(getUsersAction(pageNumber));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);