export default function Escrow({
  address,
  arbiter,
  beneficiary,
  value,
  isApproved,
  handleApprove,
}) {
  return (
    <div className="existing-contract">
      <ul className="fields">
        <li>
          <div> Address </div>
          <div> {address} </div>
        </li>
        <li>
          <div> Arbiter </div>
          <div> {arbiter} </div>
        </li>
        <li>
          <div> Beneficiary </div>
          <div> {beneficiary} </div>
        </li>
        <li>
          <div> Value </div>
          <div> {value} </div>
        </li>
        <button
          className={ isApproved ?  "complete" : "button"}
          id={address}
          onClick={(e) => {
            e.preventDefault();     
            handleApprove();
          }}
          disabled={ isApproved ? true : false }
        >
          { isApproved ? "✓ It's been approved!" : "Approve" }
        </button>
      </ul>
    </div>
  );
}