import React from "react";

const StaticPage = ({ title, content }) => {
  return (
    <div className="pt-32 px-6 md:px-16 lg:px-24 xl:px-32 pb-20 min-h-[70vh]">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl md:text-5xl font-playfair text-gray-800 mb-8">
          {title}
        </h1>

        <div className="text-gray-600 leading-8 space-y-6">
          {content}
        </div>

      </div>
    </div>
  );
};

export default StaticPage;
