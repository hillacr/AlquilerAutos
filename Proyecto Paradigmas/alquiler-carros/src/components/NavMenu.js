import React, { Component } from 'react';
import {
    Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header>
                <Navbar className=" navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" >
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row" isOpen={!this.state.collapsed} navbar>
                        <ul className="navbar-nav flex-grow">
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret className="text-white">
                                    Clientes
                                </DropdownToggle>

                                <DropdownMenu right>

                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoPersona">{"Mantenimiento de Clientes"}</NavLink>
                                                    </NavItem>
                                                </DropdownItem>

                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret className="text-white">
                                    Vehículos

                                </DropdownToggle>

                                <DropdownMenu right>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoVehiculo">Mantenimiento de Vehículos</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoTipoVehiculo">Mantenimiento de tipos de Vehículo</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/MantenimientoAlquiler">Alquileres</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/AlquilerVehiculos">Alquilar Vehículos</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret className="text-white">
                                    Logs

                                </DropdownToggle>

                                <DropdownMenu right>
                                                <DropdownItem>
                                                    <NavItem>
                                                        <NavLink tag={Link} className="text-black" to="/Logs">Lista de Logs</NavLink>
                                                    </NavItem>
                                                </DropdownItem>
                                            
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </ul>
                    </Collapse>
                    <NavbarBrand tag={Link} to="/" className="titulo">Alquiler de Vehículos</NavbarBrand>

                </Navbar>
            </header>

        );
    }
}
