import React from 'react';

import { Link } from 'react-router-dom';

const NotFoundPage = () => (
    // put an instance of Link wherever you want to use client side routing
    // Link expects link text, and a 'to' attrubute equal to the path to link to
    <div>
        404! Page Not Found - <Link to="/">Go Home</Link>
    </div>
);

export default NotFoundPage;
