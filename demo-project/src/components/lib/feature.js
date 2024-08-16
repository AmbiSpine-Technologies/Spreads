

const fileFormat = (url = "") => {
    const fileExt = url.split(".").pop().toLowerCase();
  
    if (["mp4", "webm"].includes(fileExt)) return "video";
    if (["mp3", "wav", "ogg"].includes(fileExt)) return "audio";
    if (["jpg", "jpeg", "png", "gif"].includes(fileExt)) return "img";
    if (["svg"].includes(fileExt)) return "emoji"; 
    return "unknown"; 
  };
  
  const transformImageUrl=(url="",width=100)=>url;

  
  

  export { fileFormat,transformImageUrl };
  