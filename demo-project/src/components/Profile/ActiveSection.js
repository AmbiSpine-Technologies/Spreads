import React, { useState } from "react";
import Card from "../../pages/Card/Card";

const ActivitySection = ({ activities }) => {
  
  const [selectedFilter, setSelectedFilter] = useState("all");

  
  const filterActivities = () => {
    if (selectedFilter === "all") {
      return activities;
    } else {
      return activities.filter(activity => activity.category === selectedFilter);
    }
  };

  return (
    <div className="container-fluid">
      <div className="text-start m-1 ps-4 fs-4 fw-bolder Activities">
        <h3 className="fs-5 fw-semibold">Activities</h3>
      </div>
      {/* Filter buttons */}
      <div className="d-flex flex-wrap my-3 ms-1  ">
        <button 
        style={{width:"23%"}}
          className={`btn btn-outline-secondary btn-sm m-1 ${selectedFilter === "all" ? "active" : ""}`}
          onClick={() => setSelectedFilter("all")}
        >
          All
        </button>
        <button 
        style={{width:"23%"}}
          className={`btn btn-outline-secondary btn-sm m-1 ${selectedFilter === "nature" ? "active" : ""}`}
          onClick={() => setSelectedFilter("nature")}
        >
          Post
        </button>
        <button 
        style={{width:"23%"}}
          className={`btn btn-outline-secondary btn-sm m-1 ${selectedFilter === "animals" ? "active" : ""}`}
          onClick={() => setSelectedFilter("animals")}
        >
          Repost
        </button>
        <button 
        style={{width:"23%"}}
          className={`btn btn-outline-secondary btn-sm m-1 ${selectedFilter === "show" ? "active" : ""}`}
          onClick={() => setSelectedFilter("show")}
        >
         Show 
        </button>
       
      </div>
      
      <div className="d-flex flex-wrap">
        {filterActivities().map((activity, index) => (
          <div className=" mt-1" key={index}>
            <Card image={activity.image} title={activity.title} description={activity.description} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitySection;
