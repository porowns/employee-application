import React from 'react';
import { Link } from 'react-router-dom';
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  SkipToContent,
} from 'carbon-components-react';

const EmployeeHeader = () => (
  <Header aria-label="Employee Project">
    <SkipToContent />
    <HeaderName element={Link} to="/" prefix="IBM">
      Employee Project
    </HeaderName>
    <HeaderNavigation aria-label="Employee Project Navigation">
      <HeaderMenuItem element={Link} to="/employees">
        Employees
      </HeaderMenuItem>
      <HeaderMenuItem element={Link} to="/source">
        Source Code
      </HeaderMenuItem>
    </HeaderNavigation>
  </Header>
);

export default EmployeeHeader;
