import "./videocard.css";
export default function VideoCard({ Comname, text, videoSrc }) {
  return (
    <div className="Container-fluid cards border-1 rounded-1 my-2 mx-4">
      <div className="card" style={{ width: "100%" }} >
        <div className="text-center">
          <video width="92%" controls className="border-0 rounded-2 mt-3">
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="card-body">
          <div>
            <h4 className="Spon ms-3 me-3 fw-bolder">{Comname}</h4>
            <p className="fs-6 ms-3 me-3 text text-primary-emphasis fw-medium">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
