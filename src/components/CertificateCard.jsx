import { useState } from "react"
import { useCertStatus } from "../hooks/useCertStatus"

function CertificateCard({ cert }) {
  const [open, setOpen] = useState(false)
  const { status, color, daysLeft } = useCertStatus(cert.expiry)

  return (
    <>
      <div
        className="certificate-card"
        style={{ borderColor: color }}
        onClick={() => setOpen(true)}
      >
        <h4 className="certificate-card__title">{cert.name}</h4>
        <p className="certificate-card__expiry">{cert.expiry}</p>

        <span
          className="certificate-card__status"
          style={{ backgroundColor: color }}
        >
          {status}
        </span>
      </div>

      {open && (
        <CertificateModal
          cert={cert}
          status={status}
          color={color}
          daysLeft={daysLeft}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}

export default CertificateCard

function CertificateModal({ cert, status, color, daysLeft, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">{cert.name}</h2>
        <p> Issued By: {cert.issuer}</p>
        <p> Expiry Date : {cert.expiry}</p>
        <p> Days Remaining: {daysLeft} days</p>

        <span
          className="certificate-card__status"
          style={{ backgroundColor: color }}
        >
          {status}
        </span>

        <button className="modal__close" onClick={onClose}>
          x
        </button>
      </div>
    </div>
  )
}