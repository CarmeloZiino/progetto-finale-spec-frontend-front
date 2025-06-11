
//Components
import CompareDropDown from "../components/CompareDropDown";

export default function ComparePage() {
  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <h1
          className="western-text"
          style={{
            fontSize: "3.5rem",
          }}
        >
          Confronta i nostri Gin
        </h1>
        <div className="d-flex gap-3 block-dropdown">
          <div>
            <CompareDropDown />
          </div>
          <div>
            <CompareDropDown />
          </div>
          <div className="d-none d-md-block">
            <CompareDropDown />
          </div>
          <div className="d-none d-lg-block">
            <CompareDropDown />
          </div>
        </div>
      </div>
    </>
  );
}
