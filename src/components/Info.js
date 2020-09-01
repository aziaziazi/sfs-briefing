import React from "react";
import styled from "styled-components";
import {buttonStyle} from "./code/Code";

const Wrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #2b2d42;
  opacity: 0.9;
`;

const Modal = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 500px;
  max-width: 100%;
  padding: 2rem;
  background-color: #edf2f4;
  
  h1, h2, p, a, i, li, code {
    color: #2b2d42;
    margin: 1rem 0;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    line-height: 1rem;
  }
  
  h1, h2{
    line-height: 1.4rem;
  }
  
  code {
    line-break: anywhere;
    font-style: italic;
    background-color: #DDD;
  }
  
  ul {
    list-style: none;
    padding-left: 0rem;
  }
  
  li {
    margin: 0;
  }
  
  h1:last-child, h2:last-child, p:last-child {
    margin-bottom: 0;
  }
  
  h1:first-child, h2:first-child, p:first-child {
    margin-top: 0;
  }
`;

const Go = styled.button`
  ${buttonStyle};
  display: block;
  margin-top: 1rem;
  background-color: #2b2d42;
  color: #edf2f4;
`

export const Info = ({close}) => (
  <Wrapper>
    <Background onClick={close}/>
    <Modal>
      <h1>🚀 SFS briefing</h1>
      <p>Welcome! Create your spaceships with both blueprint and visual editors️ 👩‍💻👨‍🎨</p>
      <p>This is a proof of concept in very early stage and contains only few parts and probably some bugs :) Feel free to submit PR's to the <a href="https://github.com/aziaziazi/sfs-briefing">source repo</a>.</p>
      <p><a href="https://play.google.com/store/apps/details?id=com.StefMorojna.SpaceflightSimulator&hl=fr">SpaceFlight Simulator</a> is an great sandbox game I strongly encourage you to try. If you like it too, support the team by buying an extension pack 👏</p>

      <h2>Instructions</h2>
      <ul>
        <li>👉 Click part to add in the canvas</li>
        <li>👈 Click part on the canvas to remove</li>
        <li>🔧 Move part on the canvas to update blueprint</li>
        <li>📝 Edit blueprint to update canvas</li>
        <li>🚫 Wrong edition: click 'back to valid'</li>
        <li>👩‍🚀 Ready to launch ? Copy the blueprint then paste it in <code>Android\data\com.StefMorojna.SpaceflightSimulator\files\saving\blueprints\</code> You may use the excellent <a href="https://play.google.com/store/apps/details?id=sfs.gamingbp">SFS gaming bp</a> for that.</li>
      </ul>
      <i>Dear iOS friends, SFS briefing will only be relevant for Android users because your OS won't let you update the app files.</i>
      <Go onClick={close}>Start Editing</Go>
    </Modal>
  </Wrapper>
);
