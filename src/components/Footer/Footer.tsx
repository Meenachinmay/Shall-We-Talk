import * as React from "react";
import "../footer.css";
import { FaLinkedin } from "react-icons/fa";
import { Icon, Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { privacyPolicyModelState } from "../../atoms/privacyPolicyModelState";
import PrivacyPolicyModel from "../Model/Privacy Policy/PrivacyPolicyModel";

const Footer: React.FC = () => {

  const [privacyPolicyModel, setPrivacyPolicyModelState] = useRecoilState(privacyPolicyModelState)

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <h3>Shall We Talk</h3>
        <div style={{ fontSize: "17px"}}>
          Shall We Talk は<a href="https://www.real-cnt.net/" 
            target="_blank" 
            rel="noreferrer"
            style={{ textDecoration: "underline"}}>リアルコネクト株式会社</a>によって運営されています
        </div>
        <p style={{ fontSize: "13px"}}>We are an online platform which gives you a hesitation free environment to talk to strangers in your co-working space.</p>
        <ul className="socials">
          <li>
            <a
              href="https://www.linkedin.com/company/78436150/admin/"
              target="_blank" rel="noreferrer"
            >
              <Icon cursor={"pointer"} as={FaLinkedin} />
            </a>
          </li>
          {/* <li>
            <a href="https://www.real-cnt.net/" target="_blank">
              <Icon cursor={"pointer"} as={MdEmail} />
            </a>
          </li> */}
        </ul>
      </div>
      <div className="footer-bottom">
        <p>copyright &copy;2023 SWT.</p>
        <PrivacyPolicyModel />
        <Text textDecoration={'none'} onClick={() => setPrivacyPolicyModelState({ open: true })} className="privacy__policy">利用規約 & プライバシーポリシー</Text>
      </div>
    </footer>
  );
};

export default Footer;
