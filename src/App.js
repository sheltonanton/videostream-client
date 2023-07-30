import { useEffect, useState } from "react";
import RecordAndUpload from "./RecordAndUpload";
import "./App.css";

function App() {
  const [videos, setVideos] = useState([]);
  const [video, setVideo] = useState(null);

  function fetchVideos() {
    fetch("http://localhost:8888/videos", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setVideos(res);
      });
  }

  useEffect(() => {
    fetchVideos();
  }, []);

  function onUploaded() {
    fetchVideos();
  }

  function selectedVideo(e, video) {
    e.preventDefault();
    setVideo(video);
  }

  return (
    <div className="bg-gray-100 h-screen flex flex-col items-center justify-center">
      <div className="w-full flex px-8">
        <RecordAndUpload uploaded={onUploaded} />
        <div className="w-80 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mr-4">
          <div className="w-100 h-50 text-sm font-medium text-gray-900 bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-4">
            {videos.map((v) => {
              const selected =
                "block w-full px-4 py-2 text-white bg-blue-700 border-b border-gray-200 cursor-pointer dark:bg-gray-800 dark:border-gray-600";
              const def =
                "block w-full px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white";

              return (
                <a
                  key={v.id}
                  href="#"
                  onClick={(e) => selectedVideo(e, v)}
                  className={v == video ? selected : def}
                >
                  {v.title}
                </a>
              );
            })}
          </div>
          <h4 className="text-sm font-bold">Description</h4>
          <p className="text-sm">{video && video.description}</p>
        </div>
        <div className="flex items-center justify-center bg-white shadow-md rounded px-8 mb-4 mr-4">
          {video && (
            <video key={video.id} controls width="500" height="300">
              <source
                src={`http://localhost:8888/videos/${video.file.id}/stream`}
              />
            </video>
          )}
        </div>
      </div>
      <div className="w-full flex px-8"></div>
    </div>
  );
}

export default App;
