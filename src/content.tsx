import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { Fragment, useEffect, useRef, useState } from "react"

import AIIcon from "~features/aiIcon"

import Modal from "./popup"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <Fragment>
      <div className="App">
        <AIIcon
          onClick={() =>
            setTimeout(() => {
              setShowModal(true)
            }, 200)
          }
        />
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)} />
    </Fragment>
  )
}

export default PlasmoOverlay
