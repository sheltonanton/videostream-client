import { useState } from "react";
import CameraRecorder from "./CameraRecorder";
import UploadVideo from "./UploadVideo";

export default function RecordAndUpload(props) {
  const { uploaded } = props;

  const [recording, updateRecording] = useState(null);

  function resetForm(form) {
    form.reset();
  }

  function onSubmit(e) {
    e.preventDefault();
    let data = new FormData(e.target);
    data.append("upload_file", recording);

    fetch("http://localhost:8888/videos", {
      method: "POST",
      body: data,
    }).then(() => {
      resetForm(e.target);
      updateRecording(null);
      uploaded && uploaded();
    });
  }

  function onCancel() {
    updateRecording(null);
  }

  function sendRecording(blob) {
    updateRecording(blob);
  }

  function getComponent() {
    if (!recording) {
      return <CameraRecorder onRecorded={(blob) => sendRecording(blob)} />;
    } else {
      return (
        <UploadVideo
          recording={recording}
          submitted={onSubmit}
          cancelled={onCancel}
        />
      );
    }
  }

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mr-4">
      {getComponent()}
    </div>
  );
}
