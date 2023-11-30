import "./modalOptionTools.css";

const ModalOptionTool = () => {
  return (
    <div className="modalOption">
      <div className="option">
        <div className="option-text">
          <h2>Text to speech</h2>
          <p>Transfer your text to audio </p>
        </div>
      </div>
      <div className="option">
        <div className="option-text">
          <h1>Speech to text</h1>
          <p>Convert your voice to text</p>
        </div>
      </div>
      <div className="option">
        <div className="option-text">
          <h1>Record to text</h1>
          <p>Take a direct audio recording and turn it into text</p>
        </div>
      </div>
      <div className="option">
        <div className="option-text">
          <h1>Image to text</h1>
          <p>Conver the image to text</p>
        </div>
      </div>
    </div>
  );
};

export default ModalOptionTool;
