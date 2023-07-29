import "./CameraRecorder.css";
export default function CameraRecorder(props) {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mr-4">
      <video id="mirror" width="500" height="200" />
      <div className="w-full flex items-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 mr-4 rounded focus:outline-none focus:shadow-outline">
          Start
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 mr-4 rounded focus:outline-none focus:shadow-outline">
          Stop
        </button>
      </div>
    </div>
  );
}
