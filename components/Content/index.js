import React from "react";

const Content = ({ children }) => {
  return (
    <main>
      <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
        {/* Replace with your content */}
        {children}
        {/* /End replace */}
      </div>
    </main>
  );
};

export default Content;
