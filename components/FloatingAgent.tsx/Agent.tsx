// components/FloatingAgent.tsx
import React, { useState } from "react";
import "./Agent.css"
export function FloatingAgent() {
  return (
    <div>
      {/* Floating Agent Button */}
      <div id="agentButton" className={`floating-agent`}>
        <div className="agent-wrapper">
          <div className="pulse-ring"></div>
          <img
            src="https://rexptin.vercel.app/images/RexAi.png"
            alt="AI Agent"
          />
          {/* <div className="badge2">
            <img
              src="https://rexptin.vercel.app/svg/inlogo.svg"
              alt="Badge Icon"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
