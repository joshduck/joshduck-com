import React from "react";
import "./SocialLinks.css";

export default () => (
  <ul className="SocialLinks">
    <li>
      <a href="http://www.github.com/joshduck">
        <img src="/images/social/github.svg" alt="Github" />
      </a>
    </li>
    <li>
      <a href="http://www.linkedin.com/in/joshduck">
        <img src="/images/social/linkedin.svg" alt="LinkedIn" />
      </a>
    </li>
    <li>
      <a href="http://www.twitter.com/joshduck">
        <img src="/images/social/twitter.svg" alt="Twitter" />
      </a>
    </li>
    <li>
      <a href="http://www.flickr.com/photos/joshduck/">
        <img
          src="/images/social/flickr.svg"
          alt="Flickr"
          className="SocialLinks-lowContrast"
        />
      </a>
    </li>
    <li>
      <a href="http://mailhide.recaptcha.net/d?k=01p7ldi1_AhypYUbi3NUviNw==&c=q1_IerPCYtKvpa81Qwh9FBHOhHt9jdEVnughM1rqcQ8=">
        <img src="/images/social/email.svg" alt="Email me" />
      </a>
    </li>
  </ul>
);
