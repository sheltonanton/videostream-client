import { useState, useEffect, useRef } from "react";
import "./CameraRecorder.css";

const RECORDING_TIME_IN_MS = 10 * 60 * 1000;

export default function CameraRecorder(props) {
  const mirror = useRef(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [stream, setStream] = useState(null);

  function wait(delayInMS) {
    return new Promise((resolve) => setTimeout(resolve, delayInMS));
  }

  function sendVideo(blob) {
    props.onRecorded && props.onRecorded(blob);
  }

  function startRecording(stream, recordingTimeMs) {
    const chunks = [];
    const mediaRecorder = new MediaRecorder(stream);
    setMediaRecorder(mediaRecorder);

    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };
    mediaRecorder.start();

    let stopped = new Promise((resolve, reject) => {
      mediaRecorder.onstop = () => {
        resolve();
      };
      mediaRecorder.onerror = (event) => reject(event.name);
    });

    wait(recordingTimeMs).then(() => {
      if (mediaRecorder.state == "recording") {
        stop();
      }
    });

    return stopped.then(() => chunks);
  }

  function start() {
    let cameraStream = null;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        cameraStream = stream;
        setStream(stream);
        mirror.current.srcObject = stream;

        return new Promise(
          (resolve) =>
            (mirror.current.onplaying = () => {
              resolve();
            })
        );
      })
      .then(() => startRecording(cameraStream, RECORDING_TIME_IN_MS))
      .then((recordedChunks) => {
        let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
        sendVideo(recordedBlob);
      })
      .catch((error) => {
        console.log("Error accessing the camera: ", error);
      });
  }

  function stop() {
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    mediaRecorder.stop();

    mirror.current.srcObject = null;
  }

  return (
    <div>
      <video
        className="camera-recorder-preview"
        autoPlay
        id="mirror"
        width="500"
        height="200"
        ref={mirror}
      />
      <div className="w-full flex items-center">
        <button
          onClick={() => start()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 mr-4 rounded focus:outline-none focus:shadow-outline"
        >
          Start
        </button>
        <button
          onClick={() => stop()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 mr-4 rounded focus:outline-none focus:shadow-outline"
        >
          Stop
        </button>
      </div>
    </div>
  );
}
