import moment from "moment";

const fileFormat = (url = "") => {
    const fileExt = url.split(".").pop().toLowerCase();
  
    if (["mp4", "webm"].includes(fileExt)) return "video";
    if (["mp3", "wav", "ogg"].includes(fileExt)) return "audio";
    if (["jpg", "jpeg", "png", "gif"].includes(fileExt)) return "img";
    if (["svg"].includes(fileExt)) return "emoji"; 
    return "unknown"; 
  };
  
  const transformImageUrl=(url="",width=100)=>url;

  const getLast7Days=()=>{
    const currentData=moment()
    const last7Days =[]
    for(let i=0;i<7;i++){
     const dayate=currentData.clone().subtract(i,"days");
     const dayName = dayate.format("dddd");

     last7Days.unshift(dayName)
    }

    return last7Days

 
  }

  

  export { fileFormat,transformImageUrl,getLast7Days };
  