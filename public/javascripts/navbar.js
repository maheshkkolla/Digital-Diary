import React from 'react'
import jQuery from 'jquery'
import Bootstrap from 'bootstrap'

export default class Navbar extends React.Component {

    _getContactUsView() {
        return (
            <div className="collapse navbar-collapse" >
                <ul className="nav navbar-nav navbar-right" >
                    <li> <a href="#" data-toggle="modal" data-target="#query" >
                        <span> Contact us </span>
                    </a></li>
                </ul>
            </div>
        );
    }

    _getUserOptionsView() {
        return (
            <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                    <li><a href="/" >
                        <span className="glyphicon glyphicon-pencil" > </span>
                        <span> Add a Journal </span>
                    </a></li>
                    <li><a href="/journals" >
                        <span className="glyphicon glyphicon-list-alt" >  </span>
                        <span> Journals </span>
                    </a></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" >
                        <span className="glyphicon glyphicon-user" >  </span>
                        <span> { this.props.userName } </span>
                        <span className="caret" > </span>
                    </a></li>
                </ul>
                <ul className="dropdown-menu" >
                    <li><a href='/logout' > Logout </a> </li>
                </ul>
            </div>
        );
    }

    render() {
        return (
        <nav>
            <nav className='navbar navbar-default navbar-fixed-top' >
                <div className='myContainer'>
                    <div className='navbar-header' >
                        <ul className="nav navbar-nav" >
                            <li className='dropdown' >
                                <a href='/' >
                                    <span className='logo' > Digital Diary </span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {
                        this.props.userName
                            ? this._getUserOptionsView()
                            : this._getContactUsView()
                    }
                </div>
            </nav>
            <nav className='navbar' > </nav>
        </nav>
        );
    }
}