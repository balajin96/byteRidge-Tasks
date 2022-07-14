import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import PaginationNext from 'react-bootstrap/lib/PaginationNext';
class Auditpage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, users } = this.props;
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand ></Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link ><Link to="/homePage">Home</Link></Nav.Link>
                        <Nav.Link> <Link to ="/">Auditor</Link></Nav.Link>  {/* React Router Link changed here */}
												
                        <Nav.Link> <Link to="/login">Logout</Link></Nav.Link>
                    </Nav>
                </Navbar>
                <div className="col-md-6 col-md-offset-3" >
									<Dropdown>  {/* material UI */}
										
										<date format="DD/MM/YYYY" ></date>
											<time format="hh;mm:ss">
										<ol>
									<li>12 hrs</li>
									<li>24 hrs</li>
										</ol>
										</time>
									</Dropdown> {/* material UI */}

									<datalist>
										
                    <h1>Hi {user.firstName}!</h1>
                    <p>You're logged in with React!!</p>
                    <h3>All login audit :</h3>
                    {users.loading && <em>Loading users...</em>}
                    {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                    {users.items &&
                        <ul className="user-screen">
                            {users.items.map((user, index) =>
                                <li key={user.id}>
                                    {user.id + ' ' + user.role + ' ' + user.createdDate + ' '}
                                    {user.firstName + ' ' + user.lastName}
                                    {
                                        user.deleting ? <em> - Deleting...</em>
                                            : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                                : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                    }
                                </li>
                            )}

                        </ul>
                    }
										<PaginationNext>1</PaginationNext>  {/* material Design UI */}
										
										</datalist>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedAuditPage = connect(mapState, actionCreators)(Auditpage);
export { connectedAuditPage as Auditpage };