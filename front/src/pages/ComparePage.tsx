//Import Type

//Components
import CompareDropDown from "../components/CompareDropDown";

export default function ComparePage() {
  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <h1
          className="western-text"
          style={{
            fontSize: "2rem",
            color: "var(--brand-gold-muted)",
            textShadow:
              "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
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
