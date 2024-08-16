import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
    const parser = new DataUriParser();
    const extName = path.extname(file.name); // Get file extension from 'file.name'
    return parser.format(extName, file.data).content; // Return the formatted Data URI
};

export default getDataUri;
