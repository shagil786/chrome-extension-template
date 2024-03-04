import { useEffect } from "react"

import icon from "../../assets/icons/Frame.png"

const AIIcon = ({ onClick }) => {
  useEffect(() => {
    const handleAppendMsgForm = () => {
      const msgForm = document.querySelector(".msg-form__contenteditable")
      if (msgForm) {
        //this is for adding icon insite the input field logic
        const customIcon = document.createElement("img")
        customIcon.src = icon
        customIcon.width = 32
        customIcon.alt = "Custom Icon"
        customIcon.className = "custom-icon"
        customIcon.addEventListener("click", onClick)
        //icon style
        customIcon.style.position = "absolute"
        customIcon.style.bottom = ".8rem"
        customIcon.style.margin = "auto"
        customIcon.style.cursor = "pointer"
        customIcon.style.right = "4.8rem"
        customIcon.style.display = "flex"
        customIcon.style.justifyContent = "center"
        customIcon.style.alignItems = "center"

        msgForm.parentNode.insertBefore(customIcon, msgForm.nextSibling)
      }
    }
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes) {
          mutation.addedNodes.forEach((node) => {
            if (
              node instanceof Element &&
              node.classList &&
              node.classList.contains("msg-form")
            ) {
              handleAppendMsgForm()
            }
          })
        }
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })
    return () => {
      observer.disconnect()
    }
  }, [onClick])
  return null
}

export default AIIcon
