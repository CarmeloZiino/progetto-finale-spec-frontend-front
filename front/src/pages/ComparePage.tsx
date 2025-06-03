//Import Type

//Components
import CompareDropDown from "../components/CompareDropDown";

export default function ComparePage() {
  return (
    <>
      <div>
        <h1>Confronta i nostri Gin</h1>
      </div>
      <div className="d-flex gap-3 block-dropdown">
        <div className="tableDetails d-flex flex-column gap-3">
          <p>Tipologia Distillato:</p>
          <p>Formato bottiglia:</p>
          <p>Gradazione Alcolica:</p>
          <p>Provenienza:</p>
          <p>Metodo distillazione:</p>
          <p>Gusto e aroma:</p>
        </div>
        <div>
          <CompareDropDown />
        </div>
        <div>
          <CompareDropDown />
        </div>
      </div>
    </>
  );
}
