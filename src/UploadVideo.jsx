export default function UploadVideo(props) {
  const { recording, submitted, cancelled } = props;

  const form = [
    {
      label: "Title",
      name: "title",
      type: "text",
      placeholder: "Give title to video",
    },
    {
      label: "Description",
      name: "description",
      type: "text",
      placeholder: "Give a small description",
    },
  ];

  function submit(e) {
    submitted && submitted(e);
  }

  const recordedVideoUrl =
    recording && recording instanceof Blob
      ? URL.createObjectURL(recording)
      : null;

  return (
    <form onSubmit={(e) => submit(e)} encType="multipart/form-data">
      {form.map((input, index) => {
        return (
          <div key={index} className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={input.name}
            >
              {input.label}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={input.name}
              name={input.name}
              type={input.type}
              placeholder={input.placeholder}
            />
          </div>
        );
      })}
      {recordedVideoUrl && (
        <video
          className="mb-4"
          src={recordedVideoUrl}
          width="500"
          height="200"
          controls
        />
      )}
      <div className="w-full flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Upload
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => cancelled && cancelled()}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
