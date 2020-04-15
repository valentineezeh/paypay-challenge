import React from 'react';

const EmptyPage = () => (
  <>
    <div className="empty_savings_page">
      <div className="empty_savings_page_texts">
        <h2>
          Ooops! You are yet to create an Employee or Review
        </h2>
        <p>
          To create an Employee click the icon above to login 
          {' '}
          <br />
          {' '}
          or register as an admin to create an employee and post a review
        </p>
      </div>
    </div>
  </>
);

export default EmptyPage;
