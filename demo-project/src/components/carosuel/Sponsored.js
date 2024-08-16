 import NewsCard from "./../Card/newscard";
 import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
 import "./Sponsored.css";
 export default function Sponsored() {
   return (
    <div className="container-fluid sponsored mt-5">
        <div id="carouselspon" className="carousel ms-4 me-4 mt-4">
       <div className="carousel-inner">
         <div className="text-start ms-2">
         <h3 className="fw-semibolder">Sponsored</h3>
         </div>
         <div className="carousel-item active">
           <div
             className="d-flex justify-content-center align-content-center"
             style={{ MarginRight: "5px" }}
           >
             <NewsCard />
             <NewsCard />
             <NewsCard />
           </div>
         </div>
         <div className="carousel-item">
           <div
             className="d-flex justify-content-center align-content-center"
             style={{ MarginRight: "5px" }}
           >
             <NewsCard />
             <NewsCard />
             <NewsCard />
           </div>
         </div>
         <div className="carousel-item">
           <div
            className="d-flex justify-content-center align-content-center"
             style={{ MarginRight: "5px" }}
           >
             <NewsCard />
             <NewsCard />
             <NewsCard />
           </div>
         </div>
       </div>
       <div style={{ background: "black" }} >
        
         <button
           className="carousel-control-next "
           data-bs-target="#carouselspon"
           data-bs-slide="next"
           id
         >
           <span className="fs-2 curoselright">
             <FaChevronRight
               style={{ backgroundColor: "transparent" }}
             />
           </span>
         </button>
       </div>
     </div>
    </div>
   );
 }

 {/* <button
          className="carousel-control-prev"
          data-bs-target="#carouselspon"
          data-bs-slide="prev"
        >
          <span className="fs-2">
            <FaChevronLeft
              className="text-dark"
              style={{ backgroundColor: "transparent" }}
            />
          </span>
        </button> */}



