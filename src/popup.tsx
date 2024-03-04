import { GoogleGenerativeAI } from "@google/generative-ai"
import React, { useState } from "react"

import Insert from "../assets/icons/Insert.png"
import Vector from "../assets/icons/Regenarate_Icon.png"
import RoundIcon from "../assets/icons/round_icon.png"

const genAI = new GoogleGenerativeAI(process.env.API_KEY)

const Modal = ({ isVisible, onClose }) => {
  if (!isVisible) return null
  const [command, setCommand] = useState("")
  const [arr, setArr] = useState([])
  const [flag, setFlage] = useState(false)
  const [messages, setMessages] = useState<string>(
    "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value)
  }

  const handleSendRequest = async (message: any) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const prompt = message

    const result = await model.generateContent(prompt)
    const response = await result.response

    return response.text()
  }

  const handleGenerate = (value: any) => {
    // Placeholder for actual generation logic
    handleSendRequest(value)
      .then((result) => {
        setMessages(result)
        setArr([...arr, command])
        setCommand("")
        setFlage(true)
      })
      .catch((error) => {
        setArr([...arr, command])
        setCommand("")
        setFlage(true)
      })
  }
  const handleInsert = () => {
    // Placeholder for inserting generated text into the message input field
    const msgForm = document.querySelector(".msg-form__contenteditable p")
    if (msgForm) {
      const newElment = document.createElement("p")
      newElment.innerText = messages
      msgForm.removeChild(msgForm.firstElementChild)
      msgForm.appendChild(newElment)
      let placeholder = document.querySelector(".msg-form__placeholder")
      placeholder.removeAttribute("data-placeholder")
    }
    onClose()
  }
  const handleClose = (e: any) => {
    //for close popup logic
    if (e.target.id === "wrapper") onClose()
  }

  return (
    <div
      onClick={handleClose}
      id="wrapper"
      className="fixed inset-0  flex justify-center items-center w-635">
      <div className="w-[775px] min-w-635 rounded-[15px] bg-gray-50 shadow-[0px_2px_4px_-2px_rgba(0,_0,_0,_0.1),_0px_4px_6px_-1px_rgba(0,_0,_0,_0.1)] flex flex-col items-center justify-start py-[26px] px-5 box-border gap-[26px_0px] tracking-[normal] text-left text-5xl text-colors-gray-500 font-new-style-text-2xl-semi-bold">
        {arr.map((item, index) => (
          <div key={index}>
            <div className="ml-[15px] relative w-full [border:none] bg-[transparent] self-stretch h-[68px] flex flex-row items-start justify-start box-border min-w-[250px]">
              <div className="h-68 w-[56%] rounded-xl bg-colors-gray-100 flex flex-row items-center justify-center p-4 box-border whitespace-nowrap absolute z-1 right-6 top-0 pointer-events-none">
                <div className="h-9 w-[440px] relative leading-36 flex items-center">
                  {item}
                </div>
              </div>
            </div>

            <section className="self-stretch flex flex-row items-start justify-start py-0  pr-32 mr-10 box-border max-w-full text-left text-5xl text-colors-gray-500 font-new-style-text-2xl-semi-bold">
              <div className="w-[631px] rounded-xl bg-blue-100 flex flex-row items-center justify-center p-4 box-border max-w-full">
                <div className="w-[599px] relative leading-[36px] flex items-center max-w-full mq450:text-lgi mq450:leading-[29px]">
                  {messages}
                </div>
              </div>
            </section>
          </div>
        ))}
        <footer className="self-stretch rounded-xl shadow-[0px_2px_4px_rgba(0,_0,_0,_0.06)_inset] flex flex-row items-center justify-center py-0 px-1.5 box-border gap-[0px_4px] max-w-full text-left text-5xl text-colors-gray-300 font-new-style-text-2xl-semi-bold">
          <img
            className="h-8 w-8 relative overflow-hidden shrink-0 hidden"
            alt=""
            src="/frame.svg"
          />
          <div className="flex-1 rounded-lg bg-white  overflow-hidden flex flex-row items-center justify-center pt-[5px] px-1 pb-1 max-w-full ">
            <input
              value={command}
              onChange={handleInputChange}
              className="placeholder:italic h-[52px] min-w-[635px] w-[786px] relative text-2xl placeholder:text-2xl font-medium flex items-center shrink-0 max-w-full placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
              placeholder="Your Promt..."
              type="text"
              name="search"
            />
          </div>
        </footer>
        <div className="self-stretch flex flex-row items-start justify-end py-0 px-1.5 m-0 box-border max-w-full">
          <div className="flex flex-row items-start justify-center py-0 pr-px pl-0 box-border gap-[0px_26px] max-w-full mq450:flex-wrap">
            {flag == true ? (
              <button
                onClick={handleInsert}
                className="cursor-pointer [border:none]  px-spacing-spacing-24 overflow-hidden flex flex-row items-start justify-start gap-[0px_9px]">
                <div className="rounded-lg overflow-hidden flex flex-row items-center justify-start p-4 gap-[0px_10px] border-[2px] border-solid border-colors-gray-500">
                  <img
                    className="h-[16.8px] w-[14.9px] relative"
                    alt=""
                    src={Insert}
                  />
                  <div className="relative text-3xl font-semibold mq450:text-lgi">
                    Insert
                  </div>
                </div>
              </button>
            ) : (
              ""
            )}
            {arr.length == 0 ? (
              <button
                disabled={command == ""}
                onClick={() => handleGenerate(command)}
                className="cursor-pointer [border:none] p-4 bg-blue-500 rounded-lg overflow-hidden flex flex-row items-center justify-start gap-[0px_9px] hover:bg-cornflowerblue">
                <img className="h-7 w-7 relative" alt="" src={Vector} />

                <div className="relative text-3xl font-semibold font-new-style-text-2xl-semi-bold text-white text-left mq450:text-lgi">
                  Generate
                </div>
              </button>
            ) : (
              <button
                className="cursor-pointer [border:none] p-4 bg-blue-500 rounded-lg overflow-hidden flex flex-row items-center justify-start gap-[0px_9px] hover:bg-cornflowerblue"
                onClick={() => handleGenerate(command)}>
                <img className="h-7 w-7 relative" alt="" src={RoundIcon} />

                <div className="relative text-3xl font-semibold font-new-style-text-2xl-semi-bold text-white text-left mq450:text-lgi">
                  Regenarate
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
