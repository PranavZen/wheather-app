import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Logo from '../assets/logo_new.png';

class LogoComp extends React.Component {
      render() {
            return (
                  <nav className="navbar navbar-expand-lg py-4">
                        <div className="container">
                              <Link className="" to="/">
                                    <img src={Logo} />
                              </Link>
                        </div>
                  </nav>
            )
      }
}

export default withRouter(LogoComp);